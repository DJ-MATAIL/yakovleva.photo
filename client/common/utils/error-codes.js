const errors =  {
    '5000': 'Закончились попытки ввода! Попробуйте позже!',
    '5001': 'Неверный логин или пароль',
}

export function getMessage(code) {
    return errors[code] ? errors[code] : `Ошибка! Код: ${ code }`
}
