const toProper = (str: string | null | undefined) => {
    if (str)
        return str
            .split(" ")
            .filter((word) => word !== undefined)
            .map((word) => word[0] + word.slice(1, word.length).toLowerCase())
            .join(" ")
    return "Unknown"
}

export default toProper
