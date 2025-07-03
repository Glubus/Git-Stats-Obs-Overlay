export interface AppConfig {
  projectPath: string;
  refreshInterval: number; // in milliseconds
  statsFilePath: string;
}

const appConfig: AppConfig = {
  projectPath: '.',  // Le chemin sera lu depuis config.json
  refreshInterval: 30000, // 30 seconds
  statsFilePath: '/git-stats.json'
};

export default appConfig; 