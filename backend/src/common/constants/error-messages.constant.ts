export const ErrorMessages: Record<
  string,
  { en: string; ru: string; tj: string }
> = {
  // Authentication / Authorization
  UNAUTHORIZED: {
    en: 'Unauthorized access',
    ru: 'Несанкционированный доступ',
    tj: 'Дастрасӣ иҷозат дода нашудааст',
  },
  'No initData provided': {
    en: 'No initData provided',
    ru: 'Не предоставлены данные инициализации',
    tj: 'Маълумоти initData пешниҳод нашудааст',
  },
  INVALID_TOKEN: {
    en: 'Invalid or expired token',
    ru: 'Неверный или истекший токен',
    tj: 'Токени нодуруст ё мӯҳлаташ гузашта',
  },
  FORBIDDEN: {
    en: 'Forbidden resource',
    ru: 'Доступ к ресурсу запрещен',
    tj: 'Дастрасӣ ба манбаъ манъ аст',
  },

  // General HTTP Errors
  BAD_REQUEST: {
    en: 'Bad Request',
    ru: 'Неверный запрос',
    tj: 'Дархости нодуруст',
  },
  NOT_FOUND: {
    en: 'Resource not found',
    ru: 'Ресурс не найден',
    tj: 'Манбаъ ёфт нашуд',
  },
  INTERNAL_SERVER_ERROR: {
    en: 'Internal server error',
    ru: 'Внутренняя ошибка сервера',
    tj: 'Хатои дохилии сервер',
  },

  // Users
  USER_NOT_FOUND: {
    en: 'User not found',
    ru: 'Пользователь не найден',
    tj: 'Истифодабаранда ёфт нашуд',
  },
  USER_ALREADY_EXISTS: {
    en: 'User already exists',
    ru: 'Пользователь уже существует',
    tj: 'Истифодабаранда аллакай вуҷуд дорад',
  },
};
