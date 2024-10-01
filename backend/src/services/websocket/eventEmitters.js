import chatController from "../../controllers/chat.controller.js";


export default {
    "request:friend-list": chatController.getFriends,
    "request:search:friends": chatController.searchFriends,
    "request:add-friend": chatController.addFriend,
    "request:unfriend": chatController.unfriend,
    "request:getMessages": chatController.getMessages,
    "request:send-message": chatController.message,
}
