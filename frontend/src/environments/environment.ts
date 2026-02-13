export const environment: Environment = {
  production: false,
  apiUrl: "http://localhost:4100",
  telegramBotName: "test_bot",
};

export interface Environment {
  production: boolean;
  apiUrl: string;
  telegramBotName: string;
}
