export const validate_form = (videogamesData, errors, seterrors, target) => {
    console.log(target);
    switch (target.name) {
        case "videogameName": // videogameName
            if (!(/^[a-zA-Z0-9 ]+$/.test(videogamesData.videogameName)) || videogamesData.videogameName.length > 100) {
                seterrors({ ...errors, videogameName: "Invalid Name. Must have only letters and a length of less than 100." });
            } else {
                seterrors({ ...errors, videogameName: "" });
            }
            break;
        case "description": // description
            if (!videogamesData.description) {
                seterrors({ ...errors, description: "Invalid Description. Must enter at least a brief description." });
            } else {
                seterrors({ ...errors, description: "" });
            }
            break;
        case "released": // released
            if (!videogamesData.released || !isNaN(Number(videogamesData.released))) {
                seterrors({ ...errors, released: "Invalid Released. Must enter the video game released." });
            } else {
                seterrors({ ...errors, released: "" });
            }
            break;
        case "image": // image
            if (!videogamesData.image || !isNaN(Number(videogamesData.image))) {
                seterrors({ ...errors, image: "Invalid Image. Must enter the video game image URL." });
            } else {
                seterrors({ ...errors, image: "" });
            }
            break;
        case "rating": // rating
            if ((videogamesData.rating <= 5) && (videogamesData.rating > 0) && !(isNaN(Number(videogamesData.rating)))) {
                seterrors({ ...errors, rating: "" });
            } else {
                seterrors({ ...errors, rating: "Invalid Rating. Must be a positive number greater than 1 and less than 5." });
            }
            break;
        default:
            break;
    }
}
