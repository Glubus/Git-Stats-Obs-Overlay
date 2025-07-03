export interface CommitInfo {
  hash: string;
  message: string;
  author: string;
  date: string;
  files_changed: number;
  insertions: number;
  deletions: number;
}

export interface GitStats {
  project_name: string;
  today_insertions: number;
  today_deletions: number;
  today_commits: number;
  latest_commit: CommitInfo;
  last_updated: string;
} 