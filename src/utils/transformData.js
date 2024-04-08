const transformData = (items) => {
    // Transform json data keys
    if (!items || !items.page) {
        return {};
    }

    return {
        title: items.page.title,
        totalContentItems: items.page["total-content-items"],
        pageNumRequested: items.page["page-num-requested"],
        pageSizeRequested: items.page["page-size-requested"],
        pageSizeReturned: items.page['page-size-returned'],
        contentItems: items.page['content-items'].content.map(item => ({
            name: item.name,
            posterImage: item['poster-image']
        }))
    };
};

export default transformData;
