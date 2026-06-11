export const environment: Environment = {
  production: false,
  apiUrl: "http://192.168.1.21:4100",
  // apiUrl: "api/",
  telegramBotName: "test_bot",
};

export interface Environment {
  production: boolean;
  apiUrl: string;
  telegramBotName: string;
}

