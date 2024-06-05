document.addEventListener("DOMContentLoaded", function() {
    const ratings = document.querySelectorAll('.rating');
  
    ratings.forEach(function(rating) {
      const ratingValue = parseInt(rating.getAttribute('data-rating'));
      const stars = [];
  
      // Tạo các sao dựa trên ratingValue
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        if (i <= ratingValue) {
          star.innerHTML = '★'; // Có sao
        } else {
          star.innerHTML = '☆'; // Không có sao
        }
        rating.appendChild(star);
      }
    });
  });
  