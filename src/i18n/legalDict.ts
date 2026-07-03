// Bilingual legal content for the demo Privacy Policy and Consent pages.
// Section bodies are arrays of paragraphs; `list` renders as a bulleted list.

import { SITE } from '@/lib/legal'

export interface LegalSection {
  title: string
  paras?: string[]
  list?: string[]
}

interface LegalContent {
  updatedPrefix: string
  demoNotice: string
  privacy: {
    kicker: string
    title1: string
    title2: string
    sections: LegalSection[]
    toConsent: string
    toContact: string
  }
  consent: {
    kicker: string
    title1: string
    title2: string
    intro: string
    sections: LegalSection[]
    confirmBefore: string
    confirmLink: string
    confirmAfter: string
    toContact: string
  }
}

const en: LegalContent = {
  updatedPrefix: 'Last updated',
  demoNotice:
    'This is a portfolio demo website. Real personal data is not sent to a server, stored in a database, sold, or transferred to third parties. The documents below show how a production contact website should disclose personal-data processing under Russian Federal Law No. 152-FZ.',
  privacy: {
    kicker: '152-FZ · RKN-ready demo',
    title1: 'Personal data',
    title2: 'processing policy',
    sections: [
      {
        title: '1. Status and scope',
        paras: [
          'This Policy describes the demo processing model of this static portfolio website and the production model that would be required if the contact form were connected to a real backend.',
          'The current website has no backend, no database, no CRM integration, no analytics tracker, and no email delivery service. Values entered into the contact form remain in the browser runtime and are discarded when the page is refreshed or closed.',
        ],
      },
      {
        title: '2. Operator and contact',
        paras: [
          `Demo operator: ${SITE.operator}.`,
          `Demo operator address: ${SITE.operatorAddress}.`,
          `For portfolio and personal-data questions, use ${SITE.email}. Before a real launch, the actual legal name, address, OGRN/INN where applicable, responsible person, and support contact must replace these demo details.`,
        ],
      },
      {
        title: '3. Data processed in the current demo',
        paras: ['In the current demo, the site only keeps technical preferences locally in the user browser:'],
        list: [
          'selected interface language in localStorage;',
          'cookie/banner choice in localStorage;',
          'temporary form values in React component state until the page is refreshed or closed.',
        ],
      },
      {
        title: '4. Data categories for production mode',
        paras: ['If the form is connected to a backend, the following personal data may be processed only after clear consent or another applicable legal basis:'],
        list: [
          'name or preferred form of address;',
          'email address;',
          'project message, budget range, and cooperation details voluntarily provided by the user;',
          'technical data needed to secure the request, such as timestamp, IP address, user-agent, anti-spam signals, and consent log.',
        ],
      },
      {
        title: '5. Purposes of processing',
        list: [
          'receiving and reviewing a user enquiry;',
          'preparing a reply, consultation, offer, or project estimate;',
          'discussing cooperation terms and possible contract preparation;',
          'protecting the form from spam and abuse;',
          'maintaining legally required consent and request evidence in production mode.',
        ],
      },
      {
        title: '6. Legal grounds',
        paras: [
          'For a production form, the main basis is the data subject consent under cl. 1 part 1 art. 6 and art. 9 of 152-FZ. If communication moves into contract negotiation or contract performance, cl. 5 part 1 art. 6 may also apply.',
          '152-FZ itself sets processing requirements and safeguards; it should not be treated as a universal standalone basis for every marketing/contact purpose.',
        ],
      },
      {
        title: '7. Cookies and local storage',
        paras: [
          'This demo does not use analytics, advertising, retargeting pixels, or third-party marketing cookies. It uses browser localStorage only to remember language and the cookie/banner decision. These values are not transmitted by the site.',
          'In production, any analytics, metrics, advertising, chat widgets, or third-party pixels must be separately listed with their purpose, data categories, providers, storage period, and transfer conditions.',
        ],
      },
      {
        title: '8. Localization and cross-border transfer',
        paras: [
          'For personal data of Russian citizens collected via the Internet, recording, systematization, accumulation, storage, update, and extraction must be performed using databases located in the Russian Federation unless a statutory exception applies.',
          'This demo has no database and no cross-border transfer. A production version must verify hosting, CRM, email, analytics, and backup locations before launch.',
        ],
      },
      {
        title: '9. Storage and deletion',
        paras: [
          'In demo mode, form values are not stored. Local browser preferences remain until the user clears browser data or changes browser storage settings.',
          'In production, contact enquiries should be stored only for the period needed to handle the enquiry, prepare cooperation, comply with legal duties, or defend legitimate claims. Data must be deleted or anonymized once the purpose is reached or consent is withdrawn, unless another legal basis requires continued storage.',
        ],
      },
      {
        title: '10. Security measures',
        paras: ['A production version must use proportionate legal, organizational, and technical measures, including:'],
        list: [
          'HTTPS and secure hosting configuration;',
          'server-side validation, anti-spam controls, and rate limiting for public forms;',
          'access control for any mailbox, CRM, database, or admin tool containing enquiries;',
          'logging of consent/request evidence without exposing secrets or excessive data;',
          'incident response and deletion procedures for personal data requests.',
        ],
      },
      {
        title: '11. Rights of the data subject',
        paras: ['The data subject may request:'],
        list: [
          'information about processing of their personal data;',
          'correction, blocking, deletion, or destruction of inaccurate or unlawfully processed data;',
          'withdrawal of consent;',
          'appeal of the operator actions to Roskomnadzor or a court.',
        ],
      },
      {
        title: '12. Roskomnadzor notification for production',
        paras: [
          'Before a real website begins processing personal data, the operator must assess whether notification to Roskomnadzor is required. For ordinary automated website contact forms, notification is generally required unless a specific statutory exception applies.',
          'A production launch must replace demo operator details, submit/update the RKN notification where required, keep the policy available from the form and footer, and retain evidence of separate consent.',
        ],
      },
    ],
    toConsent: '→ Consent to personal data processing',
    toContact: '→ Contact form',
  },
  consent: {
    kicker: '152-FZ · Art. 9 · Separate consent',
    title1: 'Consent to',
    title2: 'personal data processing',
    intro:
      'This page is a separate consent template for a production contact form. In the current demo, the form does not transmit or store personal data. In production, a user would give this consent by ticking the checkbox near the form and submitting the enquiry.',
    sections: [
      {
        title: 'Operator',
        paras: [
          `Demo operator: ${SITE.operator}.`,
          `Demo operator address: ${SITE.operatorAddress}.`,
          `Contact for withdrawal and questions: ${SITE.email}. Production details must be replaced with the actual operator details before launch.`,
        ],
      },
      {
        title: 'Personal data covered by consent',
        list: [
          'name or preferred form of address;',
          'email address;',
          'project message, budget range, and cooperation details;',
          'technical request and consent evidence needed for security and legal proof in production mode.',
        ],
      },
      {
        title: 'Purposes',
        paras: [
          'Receiving and reviewing the enquiry, replying to the user, preparing a consultation or offer, discussing cooperation terms, protecting the form from abuse, and keeping consent/request evidence where legally required.',
        ],
      },
      {
        title: 'Processing actions and methods',
        paras: [
          'Collection, recording, systematization, accumulation, storage, clarification, extraction, use, transfer where necessary for support or hosting, blocking, deletion, and destruction. Processing may be automated or non-automated.',
        ],
      },
      {
        title: 'Third parties and transfer',
        paras: [
          'This demo transfers data to nobody. In production, any hosting provider, email provider, CRM, anti-spam service, analytics provider, or contractor receiving access must be listed in the Policy or operator records, with transfer conditions and security responsibilities.',
        ],
      },
      {
        title: 'Validity and withdrawal',
        paras: [
          `Consent is valid from the moment it is given until the processing purpose is achieved, consent is withdrawn, or another lawful reason for processing ends. Withdrawal is sent to ${SITE.email}.`,
          'Refusal or withdrawal means the operator may be unable to respond through the contact form, but it does not restrict use of the public portfolio pages.',
        ],
      },
      {
        title: 'No public dissemination',
        paras: [
          'This consent does not permit public dissemination of personal data, publication in testimonials, subscription to marketing mailings, or transfer for advertising purposes. Such processing requires a separate basis and, where required, a separate consent.',
        ],
      },
    ],
    confirmBefore: 'I confirm that I have read the ',
    confirmLink: 'Personal Data Processing Policy',
    confirmAfter: '.',
    toContact: '→ Go to the contact form',
  },
}

const ru: LegalContent = {
  updatedPrefix: 'Редакция от',
  demoNotice:
    'Это демонстрационный сайт для портфолио. Реальные персональные данные не отправляются на сервер, не сохраняются в базе данных, не продаются и не передаются третьим лицам. Документы ниже показывают, как боевой сайт с формой обратной связи должен раскрывать обработку персональных данных по Федеральному закону № 152-ФЗ.',
  privacy: {
    kicker: '152-ФЗ · демо под требования РКН',
    title1: 'Политика обработки',
    title2: 'персональных данных',
    sections: [
      {
        title: '1. Статус и область действия',
        paras: [
          'Настоящая Политика описывает демонстрационную модель обработки на статическом сайте-портфолио и боевую модель, которая понадобится, если форма обратной связи будет подключена к реальному бэкенду.',
          'Сейчас у сайта нет бэкенда, базы данных, CRM-интеграции, аналитического трекера и сервиса отправки писем. Значения, введённые в форму, остаются в состоянии React внутри браузера и исчезают после обновления или закрытия страницы.',
        ],
      },
      {
        title: '2. Оператор и контакт',
        paras: [
          `Демо-оператор: ${SITE.operator}.`,
          `Адрес демо-оператора: ${SITE.operatorAddress}.`,
          `По вопросам портфолио и персональных данных можно написать на ${SITE.email}. Перед боевым запуском здесь нужно указать фактическое наименование, адрес, ОГРН/ИНН при наличии, ответственное лицо и контакт поддержки реального оператора.`,
        ],
      },
      {
        title: '3. Данные, обрабатываемые в текущем демо',
        paras: ['В текущем демо сайт хранит только технические предпочтения локально в браузере пользователя:'],
        list: [
          'выбранный язык интерфейса в localStorage;',
          'решение по cookie-уведомлению в localStorage;',
          'временные значения формы в состоянии React до обновления или закрытия страницы.',
        ],
      },
      {
        title: '4. Категории данных для боевого режима',
        paras: ['Если форма будет подключена к бэкенду, могут обрабатываться только данные, для которых получено понятное согласие или есть иное применимое правовое основание:'],
        list: [
          'имя или предпочтительное обращение;',
          'адрес электронной почты;',
          'текст сообщения, диапазон бюджета и сведения о проекте, добровольно указанные пользователем;',
          'технические данные для защиты запроса: дата и время, IP-адрес, user-agent, антиспам-сигналы и журнал согласия.',
        ],
      },
      {
        title: '5. Цели обработки',
        list: [
          'получение и рассмотрение обращения пользователя;',
          'подготовка ответа, консультации, предложения или оценки проекта;',
          'обсуждение условий сотрудничества и возможная подготовка договора;',
          'защита формы от спама и злоупотреблений;',
          'ведение доказательств согласия и обращения, если это требуется в боевом режиме.',
        ],
      },
      {
        title: '6. Правовые основания',
        paras: [
          'Для боевой формы основное основание — согласие субъекта персональных данных по п. 1 ч. 1 ст. 6 и ст. 9 152-ФЗ. Если общение переходит к переговорам о договоре или исполнению договора, может применяться п. 5 ч. 1 ст. 6 152-ФЗ.',
          'Сам 152-ФЗ устанавливает требования и гарантии обработки; его не следует указывать как универсальное самостоятельное основание для любой маркетинговой или контактной цели.',
        ],
      },
      {
        title: '7. Cookie и localStorage',
        paras: [
          'Это демо не использует аналитику, рекламу, ретаргетинговые пиксели и сторонние маркетинговые cookie. Сайт использует localStorage только для запоминания языка и решения по cookie-уведомлению. Эти значения сайтом не передаются.',
          'В боевом режиме любую аналитику, метрики, рекламу, чат-виджеты и сторонние пиксели нужно отдельно описать: цель, категории данных, поставщики, срок хранения и условия передачи.',
        ],
      },
      {
        title: '8. Локализация и трансграничная передача',
        paras: [
          'Для персональных данных граждан РФ, собираемых через интернет, запись, систематизация, накопление, хранение, уточнение и извлечение должны выполняться с использованием баз данных на территории РФ, если не применяется законное исключение.',
          'В этом демо базы данных и трансграничной передачи нет. В боевой версии до запуска нужно проверить локацию хостинга, CRM, почты, аналитики и резервных копий.',
        ],
      },
      {
        title: '9. Хранение и удаление',
        paras: [
          'В демо-режиме значения формы не сохраняются. Локальные предпочтения в браузере остаются до очистки данных браузера или изменения настроек хранения.',
          'В боевом режиме обращения нужно хранить только срок, необходимый для обработки запроса, подготовки сотрудничества, выполнения правовых обязанностей или защиты законных требований. После достижения цели или отзыва согласия данные удаляются либо обезличиваются, если нет другого основания для хранения.',
        ],
      },
      {
        title: '10. Меры защиты',
        paras: ['Для боевой версии нужны соразмерные правовые, организационные и технические меры, включая:'],
        list: [
          'HTTPS и безопасную конфигурацию хостинга;',
          'серверную валидацию, антиспам и rate limit для публичной формы;',
          'контроль доступа к почте, CRM, базе данных и админ-инструментам с обращениями;',
          'журналирование доказательств согласия и запросов без утечки секретов и избыточных данных;',
          'процедуры реагирования на инциденты и удаления данных по запросам субъектов.',
        ],
      },
      {
        title: '11. Права субъекта персональных данных',
        paras: ['Субъект персональных данных вправе запросить:'],
        list: [
          'информацию об обработке его персональных данных;',
          'уточнение, блокирование, удаление или уничтожение неточных либо незаконно обрабатываемых данных;',
          'отзыв согласия;',
          'обжалование действий оператора в Роскомнадзор или суд.',
        ],
      },
      {
        title: '12. Уведомление Роскомнадзора для боевого запуска',
        paras: [
          'До начала реальной обработки персональных данных оператор должен проверить, требуется ли уведомление Роскомнадзора. Для обычных автоматизированных форм обратной связи на сайте уведомление, как правило, требуется, если нет конкретного исключения из закона.',
          'Перед боевым запуском нужно заменить демо-реквизиты оператора, подать или обновить уведомление РКН при необходимости, оставить политику доступной из формы и футера, а также хранить доказательство отдельного согласия.',
        ],
      },
    ],
    toConsent: '→ Согласие на обработку персональных данных',
    toContact: '→ Форма обратной связи',
  },
  consent: {
    kicker: '152-ФЗ · ст. 9 · отдельное согласие',
    title1: 'Согласие на обработку',
    title2: 'персональных данных',
    intro:
      'Эта страница — отдельный шаблон согласия для боевой формы обратной связи. В текущем демо форма не передаёт и не сохраняет персональные данные. В боевом режиме пользователь давал бы это согласие, отмечая чекбокс возле формы и отправляя обращение.',
    sections: [
      {
        title: 'Оператор',
        paras: [
          `Демо-оператор: ${SITE.operator}.`,
          `Адрес демо-оператора: ${SITE.operatorAddress}.`,
          `Контакт для отзыва и вопросов: ${SITE.email}. Перед запуском нужно заменить эти данные на реквизиты фактического оператора.`,
        ],
      },
      {
        title: 'Персональные данные, на которые даётся согласие',
        list: [
          'имя или предпочтительное обращение;',
          'адрес электронной почты;',
          'сообщение, диапазон бюджета и сведения о проекте;',
          'технические данные запроса и доказательство согласия, необходимые для безопасности и правового подтверждения в боевом режиме.',
        ],
      },
      {
        title: 'Цели',
        paras: [
          'Получение и рассмотрение обращения, ответ пользователю, подготовка консультации или предложения, обсуждение условий сотрудничества, защита формы от злоупотреблений и хранение доказательств согласия/обращения, если это требуется законом.',
        ],
      },
      {
        title: 'Действия и способы обработки',
        paras: [
          'Сбор, запись, систематизация, накопление, хранение, уточнение, извлечение, использование, передача при необходимости поддержки или хостинга, блокирование, удаление и уничтожение. Обработка может быть автоматизированной и неавтоматизированной.',
        ],
      },
      {
        title: 'Третьи лица и передача',
        paras: [
          'В этом демо данные никому не передаются. В боевом режиме любой хостинг, почтовый сервис, CRM, антиспам-сервис, аналитика или подрядчик с доступом к данным должны быть указаны в Политике или документах оператора с условиями передачи и обязанностями по защите.',
        ],
      },
      {
        title: 'Срок действия и отзыв',
        paras: [
          `Согласие действует с момента предоставления до достижения цели обработки, отзыва согласия или прекращения иного законного основания обработки. Отзыв направляется на ${SITE.email}.`,
          'Отказ или отзыв может означать, что оператор не сможет ответить через форму обратной связи, но это не ограничивает просмотр публичных страниц портфолио.',
        ],
      },
      {
        title: 'Без распространения и рекламы',
        paras: [
          'Это согласие не разрешает публичное распространение персональных данных, публикацию в отзывах, подписку на маркетинговые рассылки или передачу для рекламы. Для такой обработки нужно отдельное основание и, когда требуется, отдельное согласие.',
        ],
      },
    ],
    confirmBefore: 'Подтверждаю, что ознакомлен(а) с ',
    confirmLink: 'Политикой обработки персональных данных',
    confirmAfter: '.',
    toContact: '→ Перейти к форме обратной связи',
  },
}

export const legalDict = { en, ru }
