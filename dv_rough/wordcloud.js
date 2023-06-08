function wordCloud(selector) {
    var fill = d3.scale.category20();
    var svg = d3.select(selector).append("svg")
        .attr("width", 500)
        .attr("height", 500)
        .style("border", "3px solid black" )
        .style("border-radius","10px")
        // border-radius: 10px;)
        .append("g")
        .attr("transform", "translate(250,250)");
    function draw(words) {
        var cloud = svg.selectAll("g text")
            .data(words, function (d) { return d.text; })
        cloud.enter()
            .append("text")
            .style("font-family", "Impact")
            .style("fill", function (d, i) { return fill(i); })
            .attr("text-anchor", "middle")
            .attr('font-size', 1)
            .text(function (d) { return d.text; });
        cloud
            .transition()
            .duration(600)
            .style("font-size", function (d) { return d.size + "px"; })
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("fill-opacity", 1);

        cloud.exit()
            .transition()
            .duration(200)
            .style('fill-opacity', 1e-6)
            .attr('font-size', 1)
            .remove();
    }
    return {
        update: function (words) {
            d3.layout.cloud().size([500, 500])
                .words(words)
                .padding(5)
                .rotate(function () { return ~~(Math.random() * 2) * 90; })
                .font("Impact")
                .fontSize(function (d) { return d.size; })
                .on("end", draw)
                .start();
        }
    }

}
var words = [
    "Many a times payment gateways   an issue, so getting the refund and the surcharges   an inconvenience nil Language barrier   also one major issue.Moslty these delivery boys   only familiar with Kanada which creates a problem while addressing any issue.Spillage, bad packaging and missing items  Once my order from kfc got exchanged with someone else. Fault was delivery boy   . feel Swiggy has a good interface for users and the delivery time to my place   Bangalore taken by Swiggy   less than Zomato when ordered from same restaurant No expect faster delivery   my area       Now days delivery ??   improved a lot like fast delivery ,but now corna time many people   hesitating to order    love zomato but   requires quality   deliver service.      Prefer hygienic delivery people nil            Spillage, bad packaging and missing items      NiL No N0     have normally had good experiences with swiggy especially for payments and refunds No Good Good so far      Now days delivery ??   improved a lot like fast delivery ,but now corna time many people hesitating to order hate online deliveries.Had harsh past experiences with delivery boys and the company responses nil   expect the food that   being delivered to be hot and fresh   love swiggy and their app user interface   No Comments  expect quality food rather than delivery time and ratings Expect the delivery person to understand our hunger Need more delivery bandwidth even   rural areas Requires professional packaging with no leakage   Need more delivery people to cover all orders       nil    No   Want different cuisine dishes options   my location   had bad experience with delivery person. They need to be polite     happy with the service of online delivery startups   need the order to be delivered fast to my location     satisfied with the service of swiggy     satisfied with zomato,    also a premium member Freshness   important but when     packed by the usual package,   feel      losing     freshness and quality   have no problem with the delivery service.     satisfied   love ordering from online as they have more varieties and discounts Online delivery requires much hygiene consciousness now than ever before      had bad experiences with delivery person, they need to be polite when asking for location and avoid asking us to come to a particular location to get the food     satisfied with the delivery service   None         satisfied with the current service of swiggy and zomato   require faster delivery with minimum calls     had bad experiences with the food delivered to me  nil      love swiggy            once had damaged package from zomato and they declined to offer me refund.worst behavior          satisfied with swiggy and their wonderful offers     Prices of food items differ while using different smartphones to order at the same time.So, there   no uniform pricing system   food delivery apps.But yes, they add a lot of convenience   our lives         okay ordering online for food   love ordering candies for my children from swiggy   hate zomato and food panda. Poor tracking and poor customer service Best service   provided by swiggy               Swiggy and zomato   the best food delivery apps   have no issues with the delivery  Food delivery apps   performing well   Bangalore. But poor delivery when   comes to rural places     love being a part of zomato premium member.   get amazing offers Whenever     not well, use dunzo to order for my whole family  Worst behavior by customer care.They process refund quite late Best delivery people working hard for their family.respect them   have no issues with the food delivery service.They're good   can't blame the delivery people for late delivery.It lies   the logistics department of such startups.       satisfied with the service and swiggy   the best   love food delivery service. They   amazing    require faster delivery. Nowadays due to covid, the delivery service   slow A delivery person abused me for marking the location wrong.   can understand his tedious work. But abusing with such vulgar words   not tolerable   Certainly a wonderful delivery service There   not much restaurant choices No problem with food delivery startups     Best service, Crazy drivers        have no problem with delivery service. BEST service        have good experience with swiggy. No issues They really need to delivery fast Not happy with the food quality when     delivered Tracking system needs to be improved, sometimes the delivery guy   still and doesn't show his movements    delivery gets slow, tend to give poor ratings on delivery    want both delivery to be quick as well as food quality to be good Paid but never received.No fresh and over paid compared to buying   directly      All good with the service.love zomato    service from a premium member     love swiggy service, followed by zomato Food quality   reducing when   gets delivered My family   satisfied with food delivery.But   worry about the quality and hygiene   had bad experiences   delivered food Marvelous service by swiggy and zomato   don't bother much about delivery unless the food   good Swiggy delivery people   polite and fast as well Time doesn't bother me, But rating does.order at high rated restaurants.preferably ratings     have no trouble with delivery of startup services My family prefers good quality food so   order at highly rated restaurants     had bad experience with delivery.It could be due to location.Brilliant execution with the delivery process     My home   near Phoenix marketcity, so time taken for delivery   less     quite satisfied with the service   had no issues as per my experience. But heard delivery people   sometimes rude   had few health issues after consuming delivered food. Restaurants need to improve their quality and delivery people should delivery   without tampering which might lead to contamination of food     order most of my meals on swiggy or zomato depending upon the offers   need the order to be delivered soon. It takes a lot of time  Food needs to have good quality. It leads me to give higher rating   appreciate the efforts of hardworking delivery people Delivery   late. Need quick updates on location of order   have no trouble with delivery   Very few times   have  had bad experienced by aggregator or restaurant  Best service comes with great offers and wonderful service Bad delivery system and less restaurant choices   order most of the times online and   feel they   safe and quick   don't bother about ratings unless they taste good.But   prefer quicker delivery.Can't hold my hunger  Good   dont have much restaurant choices and takes long time to deliver My location   outside Bangalore, good restaurants     interior regions Smooth delivery service  Fast delivery   required. But quality   super good LOVE SWIGGY AND ZOMATO. Literally the best The delivery to my locations   done pretty fast     require the food to be undamaged. Mostly the food   tampered Best Best Best Best                  Love to order online    love ordering for my family from swiggy   need faster delivery. Crazily fast delivery people besides having high traffic BEST BEST BEST          WONDERFUL WONDERFUL          FAST FAST FAST          Need quality food delivery. had worst experience of spilled food       would avoid restaurants which has less rating  Faster delivery   needed          My entire family loves swiggy Delivery people   working hard. Can't complain   don't mind about late delivery when   comes from a top rated restaurant believing   its quality   have no issues related to delivery and   prefer four plus rated restaurant   had misplaced order   the past orders Best service   had bad quality order delivered twice Bad rating doesn't mean that the food tastes bad.Delivery got no problem     Order delivered to my location   late My location   pretty well built for food delivery    believe more on quality than time of delivery   Super fast riders helps   super fast delivery   believe rating doesn't have much effect on the taste of food   need quicker delivery and more extra restaurant choices Best best fast fast quick quick My order rarely gets late. But   really pissess me off worst worst worst slow slow slow     satisfied with the service of swiggy Worst delivery system - Especially zomato  Whitefield got no problem with respect to delivery and we have a good set of restaurant here   can wait for quality food from highly rated restaurant        from a low rated restaurant.restrict myself to order from that restaurant It serves my hunger on time.But there   times   delays when   needed the most     conscious about quality more than time of delivery LOVE SWIGGY AND ZOMATO Poor delivery services Quick and fastest delivery made to my location No issues Neat package by swiggy and also takes carry of quality during covid situation   very late deliveries to my house everytime      order Love Swiggy    delivery men.They   lightning fast 560075 Quality   more important than time     love ordering online BEST BEST POSITIVE REVIEWS Delivery   my place   slow as turtle FAST FAST FAST FAST FAST   can forgive deliveries    they   late, but can't compromise with quality Fast as sonic                find no issues with the online food delivery. But requires a lil bit faster delivery   have certain high rated restaurants where   order and they deliver fast  No reason.   prefer home cooked food.   had bad experiences ordering online TOP RATING TOP RATING RATING FIVE PLUS FIVE PLUS FOUR PLUS FOUR PLUS Favorite service to reduce our hunger BAD BAD BAD POOR POOR POOR RATING    Packaging   hygienic,  would rate them high Delivery people   sweet and fast   need quality food arriving at my doorsteps within the stipulated time Can't understand what delivery people   speaking.Language barrier     less responsive delivery men.Also prevalent late deliveries poor delivery men really rushing fast to deliver the fd.But there   many spillage issues as well Had many bad experiences with respect to delivery LOVE THE PRICE AND OFFER OFFERED BY SWIGGY, USUALLY RATE FOUR PLUS Good price and offers with fast delivery   Slow delivery and   avoid ordering from poor rated restaurant  'd rather cook at home during covid-19 Many a times payment gateways   an issue, so getting the refund and the surcharges   an inconvenience nil               Language barrier   also one major issue. Moslty these delivery boys   only familiar with Kanada which creates a problem while addressing any issue. Smooth delivery service  Fast delivery   required. But quality   super good LOVE SWIGGY AND ZOMATO. Literally the best The delivery to my locations   done pretty fast     require the food to be undamaged. Mostly the food   tampered Best Best Best Best                  Love to order online    love ordering for my family from swiggy   need faster delivery. Crazily fast delivery people besides having high traffic BEST BEST BEST          WONDERFUL WONDERFUL          FAST FAST FAST          Need quality food delivery. had worst experience of spilled food       would avoid restaurants which has less rating  Faster delivery   needed          My entire family loves swiggy Delivery people   working hard. Can't complain   My home   near Phoenix marketcity, so time taken for delivery   less     quite satisfied with the service   had no issues as per my experience. But heard delivery people   sometimes rude   had few health issues after consuming delivered food. Restaurants need to improve their quality and delivery people should delivery   without tampering which might lead to contamination of food     order most of my meals on swiggy or zomato depending upon the offers   need the order to be delivered soon. It takes a lot of time  Food needs to have good quality. It leads me to give higher rating   appreciate the efforts of hardworking delivery people Delivery   late. Need quick updates on location of order   have no trouble with delivery   Very few times   have  had bad experienced by aggregator or restaurant  Best service comes with great offers and wonderful service Bad delivery system and less restaurant choices   My home   near Phoenix marketcity, so time taken for delivery   less     quite satisfied with the service   had no issues as per my experience.But heard delivery people   sometimes rude   had few health issues after consuming delivered food.Restaurants need to improve their quality and delivery people should delivery   without tampering which might lead to contamination of food     order most of my meals on swiggy or zomato depending upon the offers   need the order to be delivered soon.It takes a lot of time  Food needs to have good quality.It leads me to give higher rating   appreciate the efforts of hardworking delivery people Delivery   late.Need quick updates on location of order     require the food to be undamaged.Mostly the food   tampered Best Best Best Best                 Love to order online    love ordering for my family from swiggy   need faster delivery.Crazily fast delivery people besides having high traffic BEST BEST BEST         WONDERFUL WONDERFUL         FAST FAST FAST         Need quality food delivery.had worst experience of spilled food       would avoid restaurants which has less rating  Faster delivery   needed         My entire family loves swiggy Delivery people   working hard.Can't complain   don't mind about late delivery when   comes from a top rated restaurant believing   its quality   have no issues related to delivery and   prefer four plus rated restaurant   had misplaced order   the past orders Best service   had bad quality order delivered twice Bad rating doesn't mean that the food tastes bad. Delivery got no problem      Order delivered to my location   late My location   pretty well built for food delivery                Language barrier   also one major issue. Moslty these delivery boys   only familiar with Kanada which creates a problem while addressing any issue.  "
]
//Prepare one of the sample sentences by removing punctuation,
// creating an array of words and computing a random size attribute.
function getWords(i) {
    // console.log(words);
    return words[i]
        .replace(/[!\.,:;\?+-]/g, '')
        .replace(/\bNil\b/g, '')
        .replace(/\bNIL\b/g, ' ')
        .replace(/\bI\b/g, ' ')
        .replace(/\bare\b/g, ' ')
        .replace(/\bis\b/g, ' ')
        .replace(/\bit\b/g, ' ')
        .replace(/\bin\b/g, ' ')
        .replace(/\bIt\b/g, ' ')
        .replace(/\bif\b/g, ' ')
        .replace(/\bor\b/g, ' ')
        .split(' ')

        .map(function (d) {
            // console.log(d);
            return { text: d, size: 10 + Math.random() * 60 };
        })
    // console.log(words);
}

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords(vis, i) {
    i = i || 0;

    vis.update(getWords(i++ % words.length))
    setTimeout(function () { showNewWords(vis,i+1) }, 2000)
}

//Create a new instance of the word cloud visualisation.
var myWordCloud = wordCloud('#cloud');

//Start cycling through the demo data
showNewWords(myWordCloud);

