module.exports.showWelcomeAndDay = (req, res, next) => {
    let today = new Date();
    let currentDay = today.getDay();
    let dayInVN = '';

    switch (currentDay) {
        case 0: {
            dayInVN = "Chủ nhật";
            break;
        }
        case 1: {
            dayInVN = "Thứ hai";
            break;
        }
        case 2: {
            dayInVN = "Thứ ba";
            break;
        }
        case 3: {
            dayInVN = "Thứ tư";
            break;
        }
        case 4: {
            dayInVN = "Thứ năm";
            break;
        }
        case 5: {
            dayInVN = "Thứ sáu";
            break;
        }
        case 6: {
            dayInVN = "Thứ bảy";
            break;
        }
    }
    res.render("welcome", {
        today: dayInVN
    })
}