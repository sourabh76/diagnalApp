import transformData from "../transformData";

describe("transformData function", () => {
    it("should transform JSON data correctly", () => {
        const jsonData = {
            page: {
                title: "Sample Page",
                "total-content-items": 5,
                "page-num-requested": 1,
                "page-size-requested": 10,
                "page-size-returned": 5,
                "content-items": {
                    content: [
                        {
                            name: "Item 1",
                            "poster-image": "item1.jpg"
                        },
                        {
                            name: "Item 2",
                            "poster-image": "item2.jpg"
                        },
                        {
                            name: "Item 3",
                            "poster-image": "item3.jpg"
                        },
                        {
                            name: "Item 4",
                            "poster-image": "item4.jpg"
                        },
                        {
                            name: "Item 5",
                            "poster-image": "item5.jpg"
                        }
                    ]
                }
            }
        };

        const transformedData = transformData(jsonData);

        expect(transformedData).toEqual({
            title: "Sample Page",
            totalContentItems: 5,
            pageNumRequested: 1,
            pageSizeRequested: 10,
            pageSizeReturned: 5,
            contentItems: [
                {
                    name: "Item 1",
                    posterImage: "item1.jpg"
                },
                {
                    name: "Item 2",
                    posterImage: "item2.jpg"
                },
                {
                    name: "Item 3",
                    posterImage: "item3.jpg"
                },
                {
                    name: "Item 4",
                    posterImage: "item4.jpg"
                },
                {
                    name: "Item 5",
                    posterImage: "item5.jpg"
                }
            ]
        });
    });

    it("should return an empty object if input is invalid", () => {
        const transformedData = transformData(null);
        expect(transformedData).toEqual({});
    });
});
