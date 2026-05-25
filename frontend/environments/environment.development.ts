export const environment: Environment = {
  production: false,
  apiUrl: "http://10.132.150.181:4100",
  telegramBotName: "test_bot",
};

export interface Environment {
  production: boolean;
  apiUrl: string;
  telegramBotName: string;
}

