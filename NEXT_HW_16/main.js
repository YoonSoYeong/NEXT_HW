function showBanner(bannerId) {
    var banners = document.querySelectorAll('.banner');
    for (var i = 0; i < banners.length; i++) {
        banners[i].style.display = 'none'; // 모든 배너 숨김
    }
    var bannerToShow = document.getElementById(bannerId);
    bannerToShow.style.display = 'block'; // 선택한 배너 보임
}
