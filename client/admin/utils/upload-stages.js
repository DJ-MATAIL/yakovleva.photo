export function getText(stage) {
    switch(stage) {
        case 1: return 'В очереди'
        case 2: return 'Загружается'
        case 3: return 'Загружено'
        case 4: return 'Неверный формат'
        case 5: return 'Слишком большой вес'
        case 6: return 'Ошибка'
    }
}

export function getType(stage) {
    switch(stage) {
        case 1: return 'initial'
        case 2: return 'loading'
        case 3: return 'loaded'
        case 4:
        case 5:
        case 6: return 'error'
    }
}
