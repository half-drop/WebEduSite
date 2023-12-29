document.addEventListener('DOMContentLoaded', function() {
    var itemsPerPage = 3;
    var currentPage = 1;
    var listItems = document.querySelectorAll('#wp_news_w6 .list_item');
    var totalPages = Math.ceil(listItems.length / itemsPerPage);
    var currentPageSpan = document.getElementById('currentPage');
    var totalPagesSpan = document.getElementById('totalPages');

    function showPage(page) {
        var start = (page - 1) * itemsPerPage;
        var end = start + itemsPerPage;
        listItems.forEach(function(item, index) {
            item.style.display = (index >= start && index < end) ? '' : 'none';
        });
        currentPage = page;
        currentPageSpan.textContent = page;
        totalPagesSpan.textContent = totalPages;
    }

    document.getElementById('firstPage').addEventListener('click', function() {
        showPage(1);
    });

    document.getElementById('prevPage').addEventListener('click', function() {
        if (currentPage > 1) {
            showPage(currentPage - 1);
        }
    });

    document.getElementById('nextPage').addEventListener('click', function() {
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
        }
    });

    document.getElementById('lastPage').addEventListener('click', function() {
        showPage(totalPages);
    });

    document.getElementById('goPage').addEventListener('click', function() {
        var page = parseInt(document.getElementById('pageInput').value);
        if (!isNaN(page) && page >= 1 && page <= totalPages) {
            showPage(page);
        }
    });

    showPage(1); // 初始化显示第一页
});
