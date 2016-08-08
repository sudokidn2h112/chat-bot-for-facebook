"use strict";
var request = require("request");
var atob = require("atob");

class FacebookAPI {
    constructor() {
        this._token = "EAADypJni9YMBANDguikZChw572tZCLrmTwB0CRcZCPjBE89Vt62WPmZBJRanIbLKx6PRSlb4EzvT0X8dG9Hpx3HrOwgmmPp0gMHDoWnmqUv6kyUZAl9vLZBNl6tM0sojy3QHDdiX2ZCY0nknFej9CumZB5iAT7PGqaifb9CxfZBsGFwZDZD";
        this._storedUsers = {};
    }

    getSenderName(senderId) {
        var that = this;
        return new Promise((resolve, reject) => {
            if (that._storedUsers[senderId]) {
                resolve(that._storedUsers[senderId]);
            }
            else {

                request({
                    url: `https://graph.facebook.com/v2.6/${senderId}`,
                    qs: {
                        access_token: that._token
                    },
                    method: 'GET',

                }, function(error, response, body) {
                    var person = JSON.parse(body);
                    that._storedUsers[senderId] = person;
                    resolve(person);
                });
            }
        });
    }

    sendTextMessage(senderId, text) {
        var messageData = {
            text: text
        };
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            }
            else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    }

    sendButtonMessage(senderId, text, buttons) {
        var messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": text,
                    "buttons": buttons
                }
            }
        };
 
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            }
            else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    }

    sendAttachmentBack(senderId, attachment) {
        var messageData = {
            attachment: attachment
        };
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            }
            else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    }

    sendImage(senderId, imageUrl) {
        var messageData = {
            attachment: {
                type: "image",
                payload: {
                    url: imageUrl
                }
            }
        };
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            }
            else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    }
//
    sendFindFood(senderId){
        var messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Món Ăn Ngon Đà Thành",
					    "subtitle": "Các quán ăn ngon, bình dân, giá rẻ như hạt dẻ nhưng éo bik ăn xong có còn khỏe ko :v",
					    "image_url": "http://media.foody.vn/res/g1/6109/prof/s640x400/foody-mobile-0-518050001344437377-635447479216732659.jpg",
					    "buttons": [{
						    "type": "web_url",
						    "url": "http://www.foody.vn/da-nang",
						    "title": "FoodyDaNang"
					}],
				}, {
					    "title": "Quán Cafe View Đẹp",
					    "subtitle": "Quán cafe cho các cặp đôi yêu nhau. keke",
					    "image_url": "http://media.foody.vn/images/13(379).jpg",
					    "buttons": [{
						    "type": "web_url",
						    "url": "http://www.foody.vn/bai-viet/-dn-kho-long-bo-qua-6-quan-cafe-co-view-dep-ngat-ngay-nay-tai-khu-vuc-lien-chieu-5782",
						    "title": "CoffeeDaNang"
					}]
                    }]
                }
            }
        };
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            }
            else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
        }
    sendFindCf(senderId){
        var messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
					    "title": "Quán Cafe View Đẹp",
					    "subtitle": "Quán cafe cho các cặp đôi yêu nhau. keke",
					    "image_url": "http://media.foody.vn/images/13(379).jpg",
					    "buttons": [{
						    "type": "web_url",
						    "url": "http://www.foody.vn/bai-viet/-dn-kho-long-bo-qua-6-quan-cafe-co-view-dep-ngat-ngay-nay-tai-khu-vuc-lien-chieu-5782",
						    "title": "CoffeeDaNang"
                        
					}],
				},{     "title": "Món Ăn Ngon Đà Thành",
					    "subtitle": "Các quán ăn ngon, bình dân, giá rẻ như hạt dẻ nhưng éo bik ăn xong có còn khỏe ko :v",
					    "image_url": "http://media.foody.vn/res/g1/6109/prof/s640x400/foody-mobile-0-518050001344437377-635447479216732659.jpg",
					    "buttons": [{
						    "type": "web_url",
						    "url": "http://www.foody.vn/da-nang",
						    "title": "FoodyDaNang"
					}]
                    }]
                }
            }
        };
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            }
            else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
        } 
    //get url BB
    sendBb(senderId){
        var messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
					    "title": "Mua bán điện thoại Blackberry",
					    "subtitle": "Mua bán điện thoại blackberry cũ tại Đà Nẵng",
					    "image_url": "https://savoyxcode.files.wordpress.com/2012/11/bb-icon.jpg",
					    "buttons": [{
						    "type": "web_url",
						    "url": "http://mobigo.vn",
						    "title": "Click here for detail"
					}]
				}]
                }
            }
        };
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            }
            else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
        }
    sendHill(senderId){
        var messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
					    "title": "Bà Nà Hill Kính Chào Quý Khách!",
					    "subtitle": "Địa điểm du lịch nỗi tiếng nhất Đà Nẵng - Nơi mà bất kể du khách nào khi đến đây cũng muốn đặt chân tới.",
					    "image_url": "http://dulichbana.vn/wp-content/uploads/2015/02/bana1.jpg",
					    "buttons": [{
						    "type": "web_url",
						    "url": "http://www.banahills.com.vn/",
						    "title": "Click here for detail"
					}]
				}]
                }
            }
        };
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            }
            else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
        }     
    sendStream(senderId){
        var messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
					    "title": "Suối Thần Tài Kính Chào Quý Khách",
					    "subtitle": "Nơi du lịch với những trò chơi nước cảm giác mạnh, địa điểm với nhưng bãi tắm bùn, khoáng nỗi tiếng",
					    "image_url": "http://danangz.vn/wp-content/uploads/2016/04/cong-vien-suoi-khoang-nong.jpg",
					    "buttons": [{
						    "type": "web_url",
						    "url": "http://www.dhcgroup.vn/cong-vien-suoi-khoang-nong-nui-than-tai-pc8",
						    "title": "Click here for detail"
					}]
				}]
                }
            }
        };
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            }
            else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
        }     
    sendVillage(senderId){
        var messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
					    "title": "Làng Vân",
					    "subtitle": "Trở về với những khung cảnh ngày xưa khi chưa có điện thắp sáng cũng với Langv Vân",
					    "image_url": "http://3.bp.blogspot.com/-g6_KXO9zL4E/VhOWmo0IXLI/AAAAAAAAACo/oD_F_fuQ9hc/s1600/ngoc3.jpg",
					    "buttons": [{
						    "type": "web_url",
						    "url": "http://wildhorse.info/kinh-nghiem-di-lang-van-da-nang.html",
						    "title": "Click here for detail"
					}]
				}]
                }
            }
        };
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            }
            else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
        }         
//
    sendGenericMessage(senderId, payloadElements) {
        var messageData = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": []
                }
            }
        };

        messageData.attachment.payload.elements = payloadElements;
        request({
            url: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: this._token
            },
            method: 'POST',
            json: {
                recipient: {
                    id: senderId
                },
                message: messageData,
            }
        }, function(error, response, body) {
            if (error) {
                console.log('Error sending message: ', error);
            }
            else if (response.body.error) {
                console.log('Error: ', response.body.error);
            }
        });
    }
}

module.exports = new FacebookAPI();
