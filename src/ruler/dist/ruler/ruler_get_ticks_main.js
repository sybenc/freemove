export function ruler_get_ticks_main() {
    return this.svg
        .selectAll("text")
        .nodes()
        .map((item) => {
        if (!item)
            return 0;
        const str = item.textContent.replace(/,/g, "").replace(/−/g, "-");
        return Number(str) || 0;
    });
}
