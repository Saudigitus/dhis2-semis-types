export function genarateEmpttyRows(numberOfEmpyRows: number, headers: any[]) {
    const vars = headers.map(x => x.headers).flat().map(x => x.key)

    const object = Object.fromEntries(vars.map(key => [key, ""]))

    let sheetData: any = []

    for (let index = 1; index <= numberOfEmpyRows; index++)
        sheetData.push({ ...object, ref: index })

    return sheetData
}