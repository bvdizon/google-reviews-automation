let url = 'https://spreadsheets.google.com/feeds/list/1ih7uMSaOMxyPtBFYPS5eOzs0duxuqar3dREVZ8paUf0/od6/public/values?alt=json';
const getReviews = async() => {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
}

const processReviews = data => {
    let reviews = data.sort((a,b) => b.gsx$id.$t - a.gsx$id.$t).slice(0,10);    
    reviews.forEach(review => {
        let name = review.gsx$name.$t;
        let namelink = review.gsx$namelink.$t;
        let content = review.gsx$review.$t;
        let reviewdate = new Date(review.gsx$reviewdate.$t);
        reviewdate = reviewdate.toDateString();
        let stars = review.gsx$stars.$t;

        let starsReview = "";

        for(let i = 0; i < stars; i++ ) {
            starsReview += `<img src="/uploads/agent-1/star-full-icon.png" alt="" width="16" height="16" />`
        }

        let reviewHTML = `
        <div class="column -width-1/2 -width-1/2@md -width-1/1@sm -width-1/1@xs">
            <div><a style="text-decoration: none;" href="${namelink}" target="_blank">${name}</a></div>
                <div>
                    ${starsReview}
                </div>
            <div style="font-size: 12px; color: grey;">${reviewdate}</div>
            <div>${content}</div>
        </div>
        `;

        document.getElementById('reviews-list').innerHTML += reviewHTML;
    })      
}

getReviews()
    .then(data => processReviews(data.feed.entry))
    .catch(err => console.log(err));

