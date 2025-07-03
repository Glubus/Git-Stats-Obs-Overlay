// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::Path;
use chrono::{DateTime, Local, NaiveDate};
use git2::Repository;
use serde::{Deserialize, Serialize};

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

#[tauri::command]
fn get_git_stats(path: String) -> String {
    match update_stats(&path) {
        Ok(stats) => serde_json::to_string(&stats).unwrap_or_else(|_| "{}".to_string()),
        Err(_) => "{}".to_string()
    }
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
        
        let commit_time = commit.time();
        let commit_date = DateTime::from_timestamp(commit_time.seconds(), 0)
            .unwrap()
            .with_timezone(&Local)
            .date_naive();
        
        if commit_date != today {
            continue;
        }
        
        commit_count += 1;
        
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

fn update_stats(repo_path: &str) -> Result<GitStats, Box<dyn std::error::Error>> {
    let repo = Repository::open(&repo_path).map_err(|e| {
        format!("Impossible d'ouvrir le repository Git à '{}'.\nErreur: {}", repo_path, e)
    })?;
    
    let project_name = Path::new(&repo_path)
        .file_name()
        .unwrap_or_default()
        .to_string_lossy()
        .to_string();
    
    let today = Local::now().date_naive();
    
    let (today_insertions, today_deletions, today_commits) = get_today_stats(&repo, today)?;
    let latest_commit = get_latest_commit(&repo)?;
    
    Ok(GitStats {
        project_name,
        today_insertions,
        today_deletions,
        today_commits,
        latest_commit,
        last_updated: Local::now().format("%Y-%m-%d %H:%M:%S").to_string(),
    })
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_git_stats])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
