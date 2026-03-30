import { setCookie, getCookie, deleteCookie } from '../utils/cookie';
import type { TCategories, TSkill, TUser } from './types';

// accessToken
const generateToken = (userId: string) => {
  const stamp = Date.now();
  return `token-${userId}-${stamp}`;
};

// refreshToken
const generateRefreshToken = (userId: string) => {
  const stamp = Date.now();
  return `refresh-${userId}-${stamp}`;
};

// токен доступа на 2 дня
export const ACCESS_TOKEN_TTL = 1000 * 60 * 60 * 24 * 2;

// токен для обновления токена доступа на 14 дней
export const REFRESH_TOKEN_TTL = 1000 * 60 * 60 * 24 * 14;

// выделяем из токенов id юзера для сопоставления с дб и временную метку для проверки срока жизни токена
export const parseToken = (token: string | null) => {
  if (!token) return null;
  const parts = token.split('-', 3);
  if (parts.length !== 3) return null;

  return {
    userId: parts[1],
    stamp: Number(parts[2])
  };
};

// обновление токена доступа:
// если refresh-токен истек - удаляем токены по ключу, если нет, то обновляем accessToken
const tryRefreshAccess = (refreshToken: string): string | null => {
  const parsed = parseToken(refreshToken);
  if (!parsed) return null;

  const { userId, stamp } = parsed;

  if (Date.now() - stamp > REFRESH_TOKEN_TTL) {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
    return null;
  }

  return generateToken(userId);
};

// получаем пользователя по токену из хранилища
export const getUserApi = async (): Promise<TUser> => {
  const access = getCookie('accessToken');
  const refresh = localStorage.getItem('refreshToken');

  // access-токена нет
  if (!access) {
    if (!refresh) throw { success: false, message: 'Нужно войти' };

    // пытаемся обновить доступ к access-токену
    const newAccess = tryRefreshAccess(refresh);
    if (!newAccess) throw { success: false, message: 'Сессия истекла' };

    // если не попали в 2 ошибки выше, то обновляем токен доступа в куках
    setCookie('accessToken', newAccess);
    return getUserApi();
  }

  const parsed = parseToken(access);
  if (!parsed) throw { success: false, message: 'Неверный токен' };

  const { userId, stamp } = parsed;

  // access-токен истёк
  if (Date.now() - stamp > ACCESS_TOKEN_TTL) {
    if (!refresh) throw { success: false, message: 'Сессия истекла' };

    const newAccess = tryRefreshAccess(refresh);
    if (!newAccess) throw { success: false, message: 'Сессия истекла' };

    setCookie('accessToken', newAccess);
    return getUserApi();
  }

  // access-токен доступен - возвращаем пользователя
  const res = await fetch('/db/users.json');
  const users: TUser[] = await res.json();

  const user = users.find((u) => u.id === userId);
  if (!user) throw { success: false, message: 'Пользователь не найден' };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user);
    }, 300);
  });
};

export type TCategoriesResponse = {
  success: boolean;
  data: TCategories[];
};

// получение списка категорий и подкатегорий
export const getCategoriesApi = async (): Promise<TCategoriesResponse> => {
  const res = await fetch('/db/categories.json');
  const data: TCategories[] = await res.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: data
      });
    }, 1500);
  });
};

export type TSkillsResponse = {
  success: boolean;
  data: TSkill[];
  total: number;
};

// получение списка навыков
export const getSkillsApi = async (): Promise<TSkillsResponse> => {
  const res = await fetch('/db/skills.json');
  const data: TSkill[] = await res.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: data,
        total: data.length
      });
    }, 1500);
  });
};

export type TAuthResponse = {
  success: boolean;
  refreshToken: string;
  accessToken: string;
  user: TUser;
};

export type TLoginData = {
  email: string;
  password: string;
};

// проверка доступности имейла
export const checkEmailApi = async (email: string): Promise<boolean> => {
  const res = await fetch('/db/users.json');
  const users: TUser[] = await res.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      const exists = users.some((user) => user.email === email);
      resolve(exists);
    }, 150);
  });
};

// логин пользователя по имейлу и паролю, установка токенов доступа
export const loginUserApi = async (
  data: TLoginData
): Promise<TAuthResponse> => {
  const res = await fetch('/db/users.json');
  const users: TUser[] = await res.json();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find(
        (user) => user.email === data.email && user.password === data.password
      );

      if (!user) {
        return reject({
          success: false,
          message:
            'Email или пароль введён неверно. Пожалуйста проверьте правильность введённых данных'
        });
      }

      // генерируем новые токены для пользователя
      const accessToken = generateToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      //! проверить, не дублируется ли код с санкой
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      const authResponse: TAuthResponse = {
        success: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user
      };

      resolve(authResponse);
    }, 800);
  });
};

// выход - удаляем токены и пользователя
export const logoutApi = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');

      resolve({
        success: true,
        user: ''
      });
    }, 800);
  });

export type TUsersResponse = {
  success: boolean;
  data: TUser[];
};

// получает список всех пользователей
export const getUsersApi = async (): Promise<TUsersResponse> => {
  const res = await fetch('/db/users.json');
  const data = await res.json();

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: data
      });
    }, 1000);
  });
};

// регистрация - сохраняет нового пользователя в локальном хранилище
export const registerUserApi = (data: TUser): Promise<TAuthResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem('currentUser', JSON.stringify(data));

      // генерируем токены для нового пользователя
      const accessToken = generateToken(data.id);
      const refreshToken = generateRefreshToken(data.id);

      //! аналогично проверить установку токенов через санку в слайсе пользователя
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      return resolve({
        success: true,
        refreshToken: refreshToken,
        accessToken: accessToken,
        user: data
      });
    }, 800);
  });

// регистрация - сохраняет новый навык в локальном хранилище
export const registerSkillApi = (data: TSkill): Promise<TSkill> =>
  new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem('currentSkill', JSON.stringify(data));
      return resolve(data);
    }, 1000);
  });

/*
// доколдовать patch-запрос с редактированием данных профиля
export const updateUserApi = async (
  current: TUser,
  patch: Partial<TUser>
): Promise<TUser> => {
  await delay(600);

  return {
    ...current,
    ...patch
  };
};

// для санки
export const updateUserThunk = createAsyncThunk(
  'user/update',
  async (patch: Partial<TUser>, { getState }) => {
    const current = (getState() as RootState).user.user;
    return await updateUserApi(current!, patch);
  }
);

*/
