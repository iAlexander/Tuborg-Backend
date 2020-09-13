import 'dotenv/config';
import {QuestionCategoryEnum, RoomQuestion} from "../types";

export enum RolesTokens {
  front = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcm9udCI6dHJ1ZX0.PGvYqU8t5D1iyOnMNmbGq2sisKtHez1arXLN5eXl4NU',
  corizoid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3Jpem9pZCI6dHJ1ZX0.ak3lllvOsDJIndsNzRIAtCCN_mPoS8p8xvcfZ_u40Fk',
}

export enum Roles {
  front = 'front',
  corizoid = 'corizoid',
}

export class Config {
  port: number;
  logger: {
    name: string;
    timeFormat: string;
  };
  promoCodeLiveTime: number;
  unprotectedRoutes: string[];
  questions: RoomQuestion[];
  corizoidToken: string;
  frontToken: string;
  corizoidUrl: string;
  redis: {
    host: string;
    port: number;
  };
}

const publicPartyText = 'Тут ти маєш можливість виграти призи. Тисни «Надіслати завдання», і воно прилетить одному з вас у @HomePartyBot. Виконай таск,  запости це в інсту й тегни сторінку @tuborgua. Готово. Тепер ти візьмеш участь у розіграші. Розіграш проводиться щонеділі наступного дня після вечірки. Переможця буде обрано за допомогою сервісу random.org., дивись результати на сторінці @tuborgua!Тисни ще раз, і хтось отримає нове завдання.';
const publicShowText = 'Тисни «Надіслати завдання», і воно прилетить одному з вас у @HomePartyBot. Нікому не кажи, що саме тобі прийшло – ти маєш показати це жестами так, щоб інші тусери точно відгадали. Щойно вгадають – тисни ще раз і грайте далі.';
const publicNeverText = 'Тисни «Надіслати “Я ніколи не...”», і фраза прилетить одному з вас у @HomePartyBot. Зачитай її вголос. Хто не робив цього в житті, нічого не робить і зараз. А хто робив – 🍺. Тисни знову, і один з вас отримає нову фразу.';
const publicTruthText = 'Тисни «Надіслати завдання», і воно прилетить одному з вас у @HomePartyBot. Ти отримаєш два таски: «правда» і «дія». Зачитай обидва вголос і вибери: розказати про себе правду чи виконати божевільну дію. Після виконання тисни ще раз і лови нове завдання в чиємусь @HomePartyBot.';

export const configInstance: Config = {
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT_EXT || '6379', 10),
  },
  port: parseInt(process.env.API_PORT_EXT || '3000', 10),
  promoCodeLiveTime: 129600000, // 36h in ms
  frontToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcm9udCI6dHJ1ZX0.PGvYqU8t5D1iyOnMNmbGq2sisKtHez1arXLN5eXl4NU',
  corizoidToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb3Jpem9pZCI6dHJ1ZX0.ak3lllvOsDJIndsNzRIAtCCN_mPoS8p8xvcfZ_u40Fk',
  unprotectedRoutes: [],
  logger: {
    name: 'Debug logs',
    timeFormat: 'HH:mm:ss ms'
  },
  questions: [
    {
      id: 0,
      questionSite: publicPartyText,
      questionChat: 'Зобрази з машиною будь-який мем.',
      category: QuestionCategoryEnum.CATEGORY_1,
      used: false,
    },
    {
      id: 1,
      questionSite: publicPartyText,
      questionChat: 'Сфоткайся так, ніби тримаєш машину на руці.',
      category: QuestionCategoryEnum.CATEGORY_1,
      used: false,
    },
    {
      id: 2,
      questionSite: publicPartyText,
      questionChat: 'Сфоткайся біля машини, танцюючи свій найбожевільніший танець.',
      category: QuestionCategoryEnum.CATEGORY_1,
      used: false,
    },
    {
      id: 3,
      questionSite: publicPartyText,
      questionChat: 'Сфоткайся біля машини в стрибку.',
      category: QuestionCategoryEnum.CATEGORY_1,
      used: false,
    },
    {
      id: 4,
      questionSite: publicPartyText,
      questionChat: 'Зобрази біля машини ганста-репера.',
      category: QuestionCategoryEnum.CATEGORY_1,
      used: false,
    },
    {
      id: 5,
      questionSite: publicPartyText,
      questionChat: 'Зроби селфі зі смішним виразом обличчя на фоні машини.',
      category: QuestionCategoryEnum.CATEGORY_1,
      used: false,
    },
    {
      id: 6,
      questionSite: publicPartyText,
      questionChat: 'Сфоткай свою спробу сісти на шпагат поруч із машиною.',
      category: QuestionCategoryEnum.CATEGORY_1,
      used: false,
    },
    {
      id: 7,
      questionSite: publicPartyText,
      questionChat: 'Разом з другом/подругою зобразіть своїми тілами сердечко поруч із машиною.',
      category: QuestionCategoryEnum.CATEGORY_1,
      used: false,
    },


    {
      id: 8,
      questionSite: publicShowText,
      questionChat: 'Патімейкер',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 9,
      questionSite: publicShowText,
      questionChat: 'Хайпожер',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 10,
      questionSite: publicShowText,
      questionChat: 'Диско-партизан',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 11,
      questionSite: publicShowText,
      questionChat: 'Двіж-бодряк',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 12,
      questionSite: publicShowText,
      questionChat: 'Гопник-інтроверт',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 13,
      questionSite: publicShowText,
      questionChat: 'ТікТокер',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 14,
      questionSite: publicShowText,
      questionChat: 'Т-Рекс',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 15,
      questionSite: publicShowText,
      questionChat: 'Качок',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 16,
      questionSite: publicShowText,
      questionChat: 'Фестиваль',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 17,
      questionSite: publicShowText,
      questionChat: 'Поп-діва',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 18,
      questionSite: publicShowText,
      questionChat: 'Обнімашки',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 19,
      questionSite: publicShowText,
      questionChat: 'Вайб',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 20,
      questionSite: publicShowText,
      questionChat: 'Брудні танці',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 21,
      questionSite: publicShowText,
      questionChat: 'Караоке',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 22,
      questionSite: publicShowText,
      questionChat: 'Охрана, отмєна!',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 23,
      questionSite: publicShowText,
      questionChat: 'Пивний патруль',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 24,
      questionSite: publicShowText,
      questionChat: 'Танцполтергейст',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 25,
      questionSite: publicShowText,
      questionChat: 'Рок-н-рольщик',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 26,
      questionSite: publicShowText,
      questionChat: 'Пельмень-канібал',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 27,
      questionSite: publicShowText,
      questionChat: 'Інспектор поганих жартів',
      category: QuestionCategoryEnum.CATEGORY_2,
      used: false,
    },
    {
      id: 28,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не засинав на паті.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 29,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не цілувався ні з ким із присутніх.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 30,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не робив еротичних селфі.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 31,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не розповідав чужих секретів.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 32,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не вдягав одяг протилежної статі.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 33,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не брехав своєму партнерові.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 34,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не напивався сам.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 35,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не танцював стриптиз.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 36,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не робив татуювання.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 37,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи ні за ким не підглядав.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 38,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не виходив з дому без спідньої білизни.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 39,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не вдягав сланці зі шкарпетками.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 40,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не плакав під час перегляду фільму.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 41,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не рився в чужих речах або в телефоні.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 42,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не пропонував нікому нічого непристойного.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 43,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не був на побаченнях з двома різними людьми в один день.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 44,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не знайомився через додатки для знайомств.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 45,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не фантазував ні про кого з присутніх.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 46,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не зустрічався з кимось більше року.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 47,
      questionSite: publicNeverText,
      questionChat: 'Я ніколи не співав у душі.',
      category: QuestionCategoryEnum.CATEGORY_3,
      used: false,
    },
    {
      id: 48,
      questionSite: publicTruthText,
      questionChat: `Питання: За який вчинок тобі найбільше соромно? Дія: Зроби масаж голови будь-кому з учасників. `,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 49,
      questionSite: publicTruthText,
      questionChat: `Питання: Кого з присутніх ти б взяв/ла з собою на безлюдний острів? Дія: Візьми в гравця ліворуч будь-який предмет одягу й одягни на себе. `,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 50,
      questionSite: publicTruthText,
      questionChat: `Питання: З ким і як відбувся твій перший поцілунок? Дія: Винеси сміття просто зараз. `,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 51,
      questionSite: publicTruthText,
      questionChat: `Питання: Що тебе дратує в найкращій подрузі? Дія: Сядь на коліна будь-кому з компанії.  `,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 52,
      questionSite: publicTruthText,
      questionChat: `Питання: Кого з присутніх ти вважаєш найпривабливішим? Дія: Намалюй собі вуса зубною пастою.`,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 53,
      questionSite: publicTruthText,
      questionChat: `Питання: Яке було найгірше побачення у твоєму житті? Дія: Спародіюй будь-кого з присутніх.`,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 54,
      questionSite: publicTruthText,
      questionChat: `Питання: Кого з присутніх ти б рятував/ла останнім під час катастрофи? Дія: Стрибай на одній нозі, співаючи «Охрана, отмєна».`,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 55,
      questionSite: publicTruthText,
      questionChat: `Питання: Що тобі найбільше подобається в собі? Дія: Прочитай уголос останнє SMS-повідомлення.`,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 56,
      questionSite: publicTruthText,
      questionChat: ` Питання: Яка твоя найзаповітніша мрія? Дія: Надкуси цілу цибулину, лимон або перець чилі.`,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 57,
      questionSite: publicTruthText,
      questionChat: `Питання: Спиш або ходиш по дому голяка? Дія: Зображуй мавпочку протягом 5 хвилин.`,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 58,
      questionSite: publicTruthText,
      questionChat: `Питання: Розкажи про своє перше побачення. Дія: Станцюй тверк просто зараз.`,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 59,
      questionSite: publicTruthText,
      questionChat: `Питання: Яке було твоє перше враження про людину ліворуч від тебе? Дія: Придумай кожному з присутніх прізвисько, яке його характеризує.`,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 60,
      questionSite: publicTruthText,
      questionChat: `Питання: Яка риса тебе найбільше бісить у людях? Дія: Вхопи людину праворуч за ніс.`,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 61,
      questionSite: publicTruthText,
      questionChat: `Питання: З ким із присутніх ти б хотів/ла залишитися сам на сам? Дія: Поцілуй руку людині ліворуч.`,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 62,
      questionSite: publicTruthText,
      questionChat: `Питання: Який твій найбезглуздіший вчинок? Дія: Вкуси себе або будь-кого з присутніх за ногу.`,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 63,
      questionSite: publicTruthText,
      questionChat: `Питання: Яка твоя найтемніша потаємна фантазія? Дія: Вдягни весь свій одяг навиворіт і не перевдягайся до кінця гри.  `,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },{
      id: 64,
      questionSite: publicTruthText,
      questionChat: `Питання: Розкажи смішну історію зі свого минулого.  Дія: Станцюй танго з будь-ким із присутніх.  `,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 65,
      questionSite: publicTruthText,
      questionChat: `Питання: Ти коли-небудь цілувався/лась з людиною своєї статі?  Дія: Прочитай уголос переписку з будь-ким із присутніх.`,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 66,
      questionSite: publicTruthText,
      questionChat: ` Питання: Як би ти витратив/ла мільйон доларів?  Дія: Голосно гавкай у відчинене вікно протягом хвилини.  `,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
    {
      id: 67,
      questionSite: publicTruthText,
      questionChat: `Питання: Назви 3 речі, у любові до яких тобі соромно зізнатись.  Дія: Покажи всім присутнім 10 останніх фото на твоєму телефоні.`,
      category: QuestionCategoryEnum.CATEGORY_4,
      used: false,
    },
  ],
  corizoidUrl: 'https://www.corezoid.com/api/1/json/public/770177/90931a17fce68d55f6ae19841c12f5ff29623fc1',
};