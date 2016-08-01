"use strict";
var SimpleFilter = require("./bot_filter/simpleFilter");
var SpamFilter = require("./bot_filter/spamFilter");
var CategoryFilter = require("./bot_filter/categoryFilter");
var SearchFilter = require("./bot_filter/searchFilter");
var TagFilter = require("./bot_filter/tagFilter");
var YoutubeFilter = require("./bot_filter/youtubeFilter");
var ButtonFilter = require("./bot_filter/buttonFilter");
var EndFilter = require("./bot_filter/endFilter");
var ImageFilter = require("./bot_filter/imageFilter");

var async = require("asyncawait/async");
var await = require("asyncawait/await");

var BOT_REPLY_TYPE = require("./constants").BOT_REPLY_TYPE;
var BUTTON_TYPE = require("./constants").BUTTON_TYPE;
var PAYLOAD = require("./constants").PAYLOAD;

var girlAPI = require("./api/girlAPI");
var fbAPI = require("./api/facebookAPI");
var faceRecAPI = require("./api/faceRecAPI");
var ulti = require("./utilities");


class BotAsync {
    constructor() {

        //this._helloFilter = new SimpleFilter(["hi", "halo", "hế nhô", "he lo", "hello", "chào", "xin chào"], "Chào bạn, mềnh là bot tôi đi code dạo ^_^");

        this._helloFilter = new ButtonFilter(["hi", "halo", "hế nhô", "he lo", "hello", "chào", "xin chào", "helo", "alo", "ê mày"],
            "Chào bạn, mình là KidBot, sống nội tâm-hay khóc thầm và yêu màu hồng ^_^. Bạn thích đọc gì nào?", [{
                title: "Nâng cao trình độ",
                type: BUTTON_TYPE.POSTBACK,
                payload: PAYLOAD.TECHNICAL_POST
            }, {
                title: "Tìm hiểu nghề nghiệp",
                type: BUTTON_TYPE.POSTBACK,
                payload: PAYLOAD.CAREER_POST
            }, {
                title: "Các thứ linh tinh",
                type: BUTTON_TYPE.POSTBACK,
                payload: PAYLOAD.GENERIC_POST
            }]);

        var girlFilter = new ImageFilter(["@gái", "@girl", "hình gái", "anh gai", "cute girl"], girlAPI.getRandomGirlImage.bind(girlAPI)); // From xkcn.info
        var sexyGirlFilter = new ImageFilter(["@sexy", "sexy", "fap", "anh nong", "hot girl", "hinh sexy", "gai sexy", "sexy girl"],
            girlAPI.getRandomSexyImage.bind(girlAPI, "637434912950811", 760)); // From xinh nhẹ nhàng 
        var javGirlFilter = new SimpleFilter(["@jav", "jav", "japan anti virus", "idol", "jap"],
            "API Jav sập rồi, lúc khác quay lại nhé =))"); // From hội JAV
        var bikiniGirlFilter = new ImageFilter(["@bikini", "bikini", "ao tam", "do boi"],
            girlAPI.getRandomSexyImage.bind(girlAPI, "169971983104176", 1070)); // From hội bikini

        var youtubeFilter = new YoutubeFilter(["@nhạc", "@music", "@youtube", "@yt"]);

        var helpFilter = new ButtonFilter(["help", "giúp đỡ", "giúp với", "giúp mình", "giúp"],
            `Do bot mới được phát triển nên chỉ có 1 số tính năng sau:\n1. Hỏi linh tinh (ioc là gì).\n2. Tìm bài theo từ khóa (Cho tao 4 bài [java]).\n3. Chém gió vui.\n4. Gửi ảnh đồ vật cho bot nhận diện.\n5. Xem hình gái xinh với cú pháp @gái, @fap).\n6. Tìm nhạc với cú pháp @music (@music sơn tùng)\n`, [{
                title: "Danh mục bài viết",
                type: BUTTON_TYPE.POSTBACK,
                payload: PAYLOAD.SEE_CATEGORIES
            }, {
                title: "Xem hình gái",
                type: BUTTON_TYPE.POSTBACK,
                payload: PAYLOAD.GIRL
            }]);

        var botInfoFilter = new SimpleFilter(["may la ai", "may ten gi", "may ten la gi",
                "ban ten la gi", "ban ten gi", "ban la gi",
                "bot ten gi", "bot ten la gi", "your name"
            ],
            "Mình là chat bot KidBot. Viết bởi anh Hoàng đập chai cute,khoai to, củ bự.keke");
        var adInfoFilter = new SimpleFilter(["ad la ai", "hoi ve ad", "ad ten gi", "who is ad",
                "ad la thằng nào", "thong tin ve ad", "ad dau", "admin",
                "ai viet ra may", "who made you", "ad la gi", "ad ten la gi"
            ],
            "Ad là Hoàng Nguyễn, đập chai cute, thông minh, tinh tế =)). Bạn vào đây xem thêm nhé: https://facebook.com/SudoKid");
        var thankyouFilter = new SimpleFilter(["cảm ơn", "thank you", "thank", "nice", "hay qua",
            "gioi qua", "good job", "hay nhi", "hay ghe"
        ], "Không có chi. Rất vui vì đã giúp được cho bạn ^_^");
        var categoryFilter = new SimpleFilter(["category", "danh muc", "the loai", "chu de"],
            "Hiện tại blog có 3 category: coding, linh tinh, và nghề nghiệp");
        var chuiLonFilter = new SimpleFilter(["dm", "dmm", "đậu xanh", "rau má", "dcm", "vkl", "vl", "du me", "may bi dien",
                "bố láo", "ngu the", "me may", "ccmm", "ccmn", "bot ngu", "đờ mờ", "fuck", "fuck you"
            ],
            "Bot là người nhân hậu, éo chửi thề. Cút ngay không bố tát xéo háng bây giờ :v!");
        var testFilter = new SimpleFilter(["test"],
            "Đừng test nữa, mấy hôm nay người ta test nhiều quá bot mệt lắm rồi :'(");
        var bbFilter = new  SimpleFilter(["bb", "pp", "classic", "q10", "q20","q5","blackberry","9000","9700","9900","9780","8700","8820",
        "z10","z30","passpaort","dâu đen"],"Bạn có thể tham khảo thông tin và giá cả ở link bên dưới:\n http://mobigo.vn");
        var foodFilter = new ButtonFilter(["ăn gì","có món gì ngon","có món nào ngon","đói quá","đồ ăn","uống gì","nước gì", "khát nước", "cô hi","cohi","cafe","coffe"],'Bạn có thể tìm được món ăn ngon, rẻ mà éo biết có bổ không ở link bên dưới.keke: \n http://www.foody.vn/da-nang hoặc link bên dưới:\n https://www.facebook.com/FoodyDaNang/?fref=ts\n',[{
            title: "Món ăn ngon Đà thành",
            type: BUTTON_TYPE.POSTBACK,
            payload: PAYLOAD.FOODY 
        },{  
            title: "Quán Cafe View Đẹp",
            type: BUTTON_TYPE.POSTBACK,
            payload: PAYLOAD.COFFE
        }]);    
        this._goodbyeFilter = new SimpleFilter(["tạm biệt", "bye", "bai bai", "good bye"], "Tạm biệt, hẹn gặp lại ;)");

        this._filters = [new SpamFilter(),
            new SearchFilter(), new CategoryFilter(), new TagFilter(), youtubeFilter,
            girlFilter, sexyGirlFilter, javGirlFilter, bikiniGirlFilter,
            adInfoFilter, botInfoFilter, categoryFilter,
            chuiLonFilter, thankyouFilter, helpFilter,
            this._goodbyeFilter, this._helloFilter, testFilter,bbFilter,foodFilter, new EndFilter()
        ];
    }

    setSender(sender) {
        this._helloFilter.setOutput(`Chào ${sender.first_name} ${sender.last_name}, mình là KidBot, sống nội tâm-hay khóc thầm và yêu màu hồng ^_^. Bạn thích đọc gì nào?`);
        this._goodbyeFilter.setOutput(`Tạm biệt ${sender.first_name} ${sender.last_name}, hẹn gặp lại ;)`);
    }

    chat(input) {
        for (var filter of this._filters) {
            if (filter.isMatch(input)) {
                filter.process(input);
                return filter.reply(input);
            }
        }
    }

    reply(senderId, textInput) {
        async(() => {
            var sender = await (fbAPI.getSenderName(senderId));
            this.setSender(sender);

            var botReply = await (this.chat(textInput));
            var output = botReply.output;
            switch (botReply.type) {
                case BOT_REPLY_TYPE.TEXT:
                    fbAPI.sendTextMessage(senderId, output);
                    break;
                case BOT_REPLY_TYPE.POST:
                    if (output.length > 0) {
                        fbAPI.sendTextMessage(senderId, "Bạn xem thử mấy bài này nhé ;)\n");
                        fbAPI.sendGenericMessage(senderId, ulti.postsToPayloadElements(output));
                    }
                    else {
                        fbAPI.sendTextMessage(senderId, "Xin lỗi mình không tim được bài nào ;)");
                    }
                    break;
                case BOT_REPLY_TYPE.VIDEOS:
                    fbAPI.sendTextMessage(senderId, "Có ngay đây. Xem thoải mái ;)");
                    fbAPI.sendGenericMessage(senderId, ulti.videosToPayloadElements(output));
                    break;
                case BOT_REPLY_TYPE.BUTTONS:
                    let buttons = botReply.buttons;
                    fbAPI.sendButtonMessage(senderId, output, buttons);
                    break;
                case BOT_REPLY_TYPE.IMAGE:
                    fbAPI.sendTextMessage(senderId, "Đợi tí có liền, đồ dại gái hà, giống mình voãi ra. hà hà");
                    fbAPI.sendImage(senderId, output);
                    break;
                default:
            }
        })();
    }

    sendAttachmentBack(senderId, attachment) {
        fbAPI.sendAttachmentBack(senderId, attachment);
    }

    processImage(senderId, imageUrl) {
        // Analyze both emo and image
        faceRecAPI.analyzeImage(imageUrl).then((reply) => {
            fbAPI.sendTextMessage(senderId, reply);
        });

        faceRecAPI.analyzeEmo(imageUrl).then((reply) => {
            fbAPI.sendTextMessage(senderId, reply);
        });
    }

    processPostback(senderId, payload) {
        async(() => {
            var sender = await (fbAPI.getSenderName(senderId));
            this.setSender(sender);
            switch (payload) {
                case PAYLOAD.TECHNICAL_POST:
                    this.reply(senderId, "{coding}");
                    break;
                case PAYLOAD.CAREER_POST:
                    this.reply(senderId, "{nghe nghiep}");
                    break;
                case PAYLOAD.GENERIC_POST:
                    this.reply(senderId, "{linh tinh}");
                    break;
                case PAYLOAD.SEE_CATEGORIES:
                    this.reply(senderId, "hello");
                    break;
                case PAYLOAD.HELP:
                    this.reply(senderId, "-help");
                    break;
                case PAYLOAD.GIRL:
                    this.reply(senderId, "@girl");
                    break;
                case PAYLOAD.FOODY:
                    this.reply(senderId, "{foody}");
                    break;
                case PAYLOAD.COFFE:
                    this.reply(senderId, "{coffe}");
                    break;
                default:
                    console.log("Unknown payload: " + payload);
            }
        })();
    }
}

module.exports = new BotAsync();
