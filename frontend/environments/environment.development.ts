export const environment: Environment = {
  production: false,
  // apiUrl: "http://10.83.95.181:4100/",
  apiUrl: "api/",
  telegramBotName: "test_bot",
};

export interface Environment {
  production: boolean;
  apiUrl: string;
  telegramBotName: string;
}

