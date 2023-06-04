
function getAllBookmarks() {
    const res =[
        {
            rawText: "",
            imageLinks: [],
            meatadata: {
                timestamp: "2021-09-09T12:00:00.000Z",
                url: "https://www.google.com/donald_trump"
            }
        },
        {

        }
    ]

    return res;
}

// function createEvent(params, token) {
//     const { startDate, departure, destination, owner, notes, capacity, title } = params;
//     const res = await axios.post(`${BASE_URL}/api/events`, {
//         startDate: startDate,
//         departure: departure,
//         destination: destination,
//         owner: owner,
//         notes: notes,
//         capacity: capacity,
//         title: title,
//     }, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     // const { _id } = res.data.data;
//     // createMessageGroup(_id, token);
//     return res;
// }



export { getAllBookmarks };
