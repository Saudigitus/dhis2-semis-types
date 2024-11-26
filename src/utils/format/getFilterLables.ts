export function getFilterLables(options: { value: string, label: string }[]) {
    let filter = ""

    options.map((option) => {
        filter += option.value.substring(0, 1).toUpperCase() + option.value.substring(1, option.value.length) + ","
    })

    return filter.substring(0, filter.length - 1)
}
