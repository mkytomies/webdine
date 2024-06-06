let reviewIndex = 0;
const max_length = 30;

async function fetchReview() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        const data = await response.json();

        const review = data[reviewIndex];

        let comment = review.body;

        if(comment.length > max_length) {
            comment = comment.substring(0, max_length) + '...';
        }

        document.getElementById("comment").textContent = comment;
        document.getElementById("email").textContent = review.email;

        reviewIndex = (reviewIndex + 1) % data.length;
    } catch(error) {
        console.error('Error fetching reviews', error);
    }
}

document.getElementById("next").addEventListener("click", fetchReview);

fetchReview();