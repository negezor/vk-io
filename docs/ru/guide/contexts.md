# Contexts

Описание принципов работы с контекстами

## Описание типов
[Attachment API Reference [EN]](https://negezor.github.io/vk-io/references/vk-io/classes/Context.html)

## Инициализация
[Опции конструктора](https://negezor.github.io/vk-io/references/vk-io/interfaces/IContextOptions.html)

## Концепция

Представляет из себя базовый класс для работы с контекстами. Контексты проходят через [middleware](https://ru.wikipedia.org/wiki/%D0%A1%D0%B2%D1%8F%D0%B7%D1%83%D1%8E%D1%89%D0%B5%D0%B5_%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%BD%D0%BE%D0%B5_%D0%BE%D0%B1%D0%B5%D1%81%D0%BF%D0%B5%D1%87%D0%B5%D0%BD%D0%B8%D0%B5), позволяя себя модифицировать.

У каждого контекста есть описание типов вызываемых событий
- [type](https://negezor.github.io/vk-io/references/vk-io/classes/Context.html#type) — основной тип контекста (например `message`) 
- [subTypes](https://negezor.github.io/vk-io/references/vk-io/classes/Context.html#subTypes) — подтипы контекста (например `[message_new, chat_kick_user]`)

Для удобного определения контекста, есть метод [context.is()](https://negezor.github.io/vk-io/references/vk-io/classes/Context.html#is), позволяет искать сразу по типу и подтипу. Производит поиск пока не найдёт одно подходящее значение.

```ts
// Context { type: 'message', subTypes: [...] }
context.is(['message']); // => true

// Context { type: 'message', subTypes: ['chat_invite_user_by_link'] }
context.is(['chat_invite_user', 'chat_invite_user_by_link']); // => true
```

В каждом контексте, так же есть стандартное пространство для хранения простых состояний, в свойстве [state](https://negezor.github.io/vk-io/references/vk-io/classes/Context.html#state)

```ts
updates.on('message_new', async (context, next) => {
	context.state.user = await fetchUser(context.senderId);
	// При этом ничего вам не мешает расширить сам контекст
	// context.user = await fetchUser(context.senderId);

	return next();
});
```

Список контекстов:
- [VoteContext](https://negezor.github.io/vk-io/references/vk-io/classes/VoteContext.html)
- [LikeContext](https://negezor.github.io/vk-io/references/vk-io/classes/LikeContext.html)
- [TypingContext](https://negezor.github.io/vk-io/references/vk-io/classes/TypingContext.html)
- [CommentContext](https://negezor.github.io/vk-io/references/vk-io/classes/CommentContext.html)
- [MessageContext](https://negezor.github.io/vk-io/references/vk-io/classes/MessageContext.html)
- [WallPostContext](https://negezor.github.io/vk-io/references/vk-io/classes/WallPostContext.html)
- [GroupUserContext](https://negezor.github.io/vk-io/references/vk-io/classes/GroupUserContext.html)
- [DialogFlagsContext](https://negezor.github.io/vk-io/references/vk-io/classes/DialogFlagsContext.html)
- [MarketOrderContext](https://negezor.github.io/vk-io/references/vk-io/classes/MarketOrderContext.html)
- [GroupUpdateContext](https://negezor.github.io/vk-io/references/vk-io/classes/GroupUpdateContext.html)
- [GroupMemberContext](https://negezor.github.io/vk-io/references/vk-io/classes/GroupMemberContext.html)
- [MessageEventContext](https://negezor.github.io/vk-io/references/vk-io/classes/MessageEventContext.html)
- [MessagesReadContext](https://negezor.github.io/vk-io/references/vk-io/classes/MessagesReadContext.html)
- [MessageFlagsContext](https://negezor.github.io/vk-io/references/vk-io/classes/MessageFlagsContext.html)
- [VKAppPayloadContext](https://negezor.github.io/vk-io/references/vk-io/classes/VKAppPayloadContext.html)
- [DonutWithdrawContext](https://negezor.github.io/vk-io/references/vk-io/classes/DonutWithdrawContext.html)
- [NewAttachmentsContext](https://negezor.github.io/vk-io/references/vk-io/classes/NewAttachmentsContext.html)
- [FriendActivityContext](https://negezor.github.io/vk-io/references/vk-io/classes/FriendActivityContext.html)
- [DialogMessagesContext](https://negezor.github.io/vk-io/references/vk-io/classes/DialogMessagesContext.html)
- [VKPayTransactionContext](https://negezor.github.io/vk-io/references/vk-io/classes/VKPayTransactionContext.html)
- [DonutSubscriptionContext](https://negezor.github.io/vk-io/references/vk-io/classes/DonutSubscriptionContext.html)
- [MessageSubscriptionContext](https://negezor.github.io/vk-io/references/vk-io/classes/MessageSubscriptionContext.html)
- [DonutSubscriptionPriceContext](https://negezor.github.io/vk-io/references/vk-io/classes/DonutSubscriptionPriceContext.html)
- [DialogNotificationSettingsContext](https://negezor.github.io/vk-io/references/vk-io/classes/DialogNotificationSettingsContext.html)

::: warning Внимание
Контексты могут содержать не полные данные, если например вы получаете их с User Long Poll.
:::

## Сериализация контекста

```ts
JSON.stringify(context); // => object
```
