use std::path::Path;
use std::env;
use std::fs;
use chrono::{DateTime, Local, NaiveDate};
use clap::Parser;
use git2::Repository;
use serde::{Deserialize, Serialize};

#[derive(Parser, Debug)]
#[command(name = "git-stats-fetcher")]
#[command(about = "Fetches Git statistics for today and latest commit")]
struct Args {
    /// Path to the git repository (defaults to current directory)
    #[arg(short, long)]
    path: Option<String>,
    
    /// Output file path for JSON (defaults to ../src/git-stats.json)
    #[arg(short, long)]
    output: Option<String>,
}

#[derive(Serialize, Deserialize, Debug)]
struct GitStats {
    project_name: String,
    today_insertions: u32,
    today_deletions: u32,
    today_commits: u32,
    latest_commit: CommitInfo,
    last_updated: String,
}

#[derive(Serialize, Deserialize, Debug)]
struct CommitInfo {
    hash: String,
    message: String,
    author: String,
    date: String,
    files_changed: u32,
    insertions: u32,
    deletions: u32,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = Args::parse();
    
    // Determine repository path
    let repo_path = args.path.unwrap_or_else(|| {
        env::current_dir()
            .unwrap()
            .parent() // Go up one level from git-stats-fetcher to the actual project
            .unwrap_or_else(|| Path::new("."))
            .to_string_lossy()
            .to_string()
    });
    
    println!("Scanning repository at: {}", repo_path);
    
    // Open repository 
    let repo = Repository::open(&repo_path).map_err(|e| {
        format!("Impossible d'ouvrir le repository Git à '{}'.\nErreur: {}\n\nSolutions possibles:\n- Exécutez: git config --global --add safe.directory '{}'\n- Ou changez le propriétaire du dossier\n- Ou exécutez en tant qu'administrateur", repo_path, e, repo_path)
    })?;
    
    // Get project name from directory
    let project_name = Path::new(&repo_path)
        .file_name()
        .unwrap_or_default()
        .to_string_lossy()
        .to_string();
    
    // Get today's date
    let today = Local::now().date_naive();
    
    // Get stats
    let (today_insertions, today_deletions, today_commits) = get_today_stats(&repo, today)?;
    let latest_commit = get_latest_commit(&repo)?;
    
    let stats = GitStats {
        project_name,
        today_insertions,
        today_deletions,
        today_commits,
        latest_commit,
        last_updated: Local::now().format("%Y-%m-%d %H:%M:%S").to_string(),
    };
    
    // Output path
    let output_path = args.output.unwrap_or_else(|| "../src/git-stats.json".to_string());
    
    // Write JSON
    let json = serde_json::to_string_pretty(&stats)?;
    fs::write(&output_path, json)?;
    
    println!("Stats written to: {}", output_path);
    println!("Today's activity: +{} -{} ({} commits)", 
             stats.today_insertions, stats.today_deletions, stats.today_commits);
    println!("Latest commit: {} by {}", 
             &stats.latest_commit.message[..std::cmp::min(50, stats.latest_commit.message.len())],
             stats.latest_commit.author);
    
    Ok(())
}

fn get_today_stats(repo: &Repository, today: NaiveDate) -> Result<(u32, u32, u32), git2::Error> {
    let mut revwalk = repo.revwalk()?;
    revwalk.push_head()?;
    
    let mut total_insertions = 0u32;
    let mut total_deletions = 0u32;
    let mut commit_count = 0u32;
    
    for oid in revwalk {
        let oid = oid?;
        let commit = repo.find_commit(oid)?;
        
        // Convert commit time to local date
        let commit_time = commit.time();
        let commit_date = DateTime::from_timestamp(commit_time.seconds(), 0)
            .unwrap()
            .with_timezone(&Local)
            .date_naive();
        
        // Only process commits from today
        if commit_date != today {
            continue;
        }
        
        commit_count += 1;
        
        // Get diff stats for this commit
        if let Ok(tree) = commit.tree() {
            let parent_tree = if commit.parent_count() > 0 {
                commit.parent(0).ok().and_then(|p| p.tree().ok())
            } else {
                None
            };
            
            if let Some(parent_tree) = parent_tree {
                if let Ok(diff) = repo.diff_tree_to_tree(Some(&parent_tree), Some(&tree), None) {
                    let stats = diff.stats()?;
                    total_insertions += stats.insertions() as u32;
                    total_deletions += stats.deletions() as u32;
                }
            } else {
                // First commit, count all lines as insertions
                if let Ok(diff) = repo.diff_tree_to_tree(None, Some(&tree), None) {
                    let stats = diff.stats()?;
                    total_insertions += stats.insertions() as u32;
                }
            }
        }
    }
    
    Ok((total_insertions, total_deletions, commit_count))
}

fn get_latest_commit(repo: &Repository) -> Result<CommitInfo, git2::Error> {
    let head = repo.head()?;
    let commit = head.peel_to_commit()?;
    
    let hash = commit.id().to_string()[..8].to_string();
    let message = commit.message().unwrap_or("No message").to_string();
    let author = commit.author().name().unwrap_or("Unknown").to_string();
    
    let commit_time = commit.time();
    let date = DateTime::from_timestamp(commit_time.seconds(), 0)
        .unwrap()
        .with_timezone(&Local)
        .format("%Y-%m-%d %H:%M:%S")
        .to_string();
    
    // Get diff stats for latest commit
    let (files_changed, insertions, deletions) = if let Ok(tree) = commit.tree() {
        let parent_tree = if commit.parent_count() > 0 {
            commit.parent(0).ok().and_then(|p| p.tree().ok())
        } else {
            None
        };
        
        if let Some(parent_tree) = parent_tree {
            if let Ok(diff) = repo.diff_tree_to_tree(Some(&parent_tree), Some(&tree), None) {
                if let Ok(stats) = diff.stats() {
                    (stats.files_changed() as u32, stats.insertions() as u32, stats.deletions() as u32)
                } else {
                    (0, 0, 0)
                }
            } else {
                (0, 0, 0)
            }
        } else {
            // First commit
            if let Ok(diff) = repo.diff_tree_to_tree(None, Some(&tree), None) {
                if let Ok(stats) = diff.stats() {
                    (stats.files_changed() as u32, stats.insertions() as u32, 0)
                } else {
                    (0, 0, 0)
                }
            } else {
                (0, 0, 0)
            }
        }
    } else {
        (0, 0, 0)
    };
    
    Ok(CommitInfo {
        hash,
        message,
        author,
        date,
        files_changed,
        insertions,
        deletions,
    })
} 