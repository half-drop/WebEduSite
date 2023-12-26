const imgJsons = [
    {"src": "../img/main_foot/1.jpg", "url": "../img/main_foot/1.jpg"},
    {"src": "../img/main_foot/2.jpg", "url": "../img/main_foot/2.jpg"},
    {"src": "../img/main_foot/3.jpg", "url": "../img/main_foot/3.jpg"},
    {"src": "../img/main_foot/4.jpg", "url": "../img/main_foot/4.jpg"},
    {"src": "../img/main_foot/5.jpg", "url": "../img/main_foot/5.jpg"},
];
let currentIndex = 0;
let autoSlideTimer;
function openWindow() {
    const jumpUrl = imgJsons[currentIndex].url;
    if (jumpUrl) {
        window.open(jumpUrl);
    }
}
function initSlideshow() {
    try {
        if (imgJsons.length === 0) {
            imgShow.style.display = "none";
            document.getElementById('imgNumber').style.display = "none";
            return;
        }
        imgShow.src = imgJsons[currentIndex].src; // 设置初始图片

        updateSlide();
    } catch (e) {
        console.error("Slideshow initialization failed:", e);
    }
}
function updateSlide(index) {
    clearTimeout(autoSlideTimer);

    if (index >= 0 && index < imgJsons.length) {
        currentIndex = index;
    } else {
        // 如果是自动轮播，更新currentIndex为下一张图片的索引
        currentIndex = (currentIndex + 1) % imgJsons.length;
    }

    // 淡出当前图片
    fadeOut(imgShow, function() {
        // 图片淡出后，更换图片并淡入
        imgShow.src = imgJsons[currentIndex].src;
        fadeIn(imgShow);

        // 更新底部数字
        imgNumber.innerHTML = imgJsons.map((_, i) =>
            `<a href="javascript:updateSlide(${i})" class="${i === currentIndex ? 'current' : 'nomal'}">${i + 1}</a>`
        ).join('');

        // 设置下一次自动轮播
        if (imgJsons.length >= 1) {
            autoSlideTimer = setTimeout(() => updateSlide(-1), 3000); // 包括淡入淡出时间
        }
    });
}

function fadeOut(element, callback) {
    let opacity = 1;  // 初始透明度
    const timer = setInterval(function () {
        if (opacity <= 0) {
            clearInterval(timer);
            element.style.display = 'none';
            callback(); // 淡出完成后调用回调函数
        }
        element.style.opacity = opacity;
        opacity -= 0.01; // 调整透明度减小的步长
    }, 1); // 调整间隔时间
}
function fadeIn(element) {
    let opacity = 0;  // 初始透明度
    element.style.display = 'block';
    const timer = setInterval(function () {
        if (opacity >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = opacity;
        opacity += 0.01; // 调整透明度增加的步长
    }, 1); // 调整间隔时间
}

document.addEventListener('DOMContentLoaded', initSlideshow);

document.addEventListener('DOMContentLoaded', function () {
    const itemsPerPage = 10;
    const newsContainer = document.getElementById('news-container');
    const pagination = document.getElementById('pagination');

    // 假设这个函数返回所有的列表项
    const allItems = getAllNewsItems(); // 替换为您自己的列表项数组

    // 分割数据为每页10条
    const paginatedItems = paginateItems(allItems, itemsPerPage);

    // 创建分页导航
    createPagination(paginatedItems.length);

    // 默认显示第一页
    showPage(1);

    function paginateItems(items, itemsPerPage) {
        const pages = [];
        for (let i = 0; i < items.length; i += itemsPerPage) {
            pages.push(items.slice(i, i + itemsPerPage));
        }
        return pages;
    }

    function createPagination(numPages) {
        for (let i = 1; i <= numPages; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.addEventListener('click', function () {
                showPage(i);
            });
            pagination.appendChild(button);
        }
    }

    function showPage(pageNum) {
        newsContainer.innerHTML = '';
        paginatedItems[pageNum - 1].forEach(item => {
            newsContainer.appendChild(item);
        });
    }

    function getAllNewsItems() {
        // 返回所有列表项的元素数组
        // 示例：return document.querySelectorAll('.list_item');
        // 确保这里返回的是一个实际的元素数组
    }
});
