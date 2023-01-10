const leftSeats = [
    { g: [0, 0, 0, 0] },
    { f: [0, 0, 0, 0] },
    { e: [0, 0, 0, 0] },
    { d: [0, 0, 0, 0] },
    { c: [0, 0, 0, 0] },
    { b: [0, 0, 0, 0] },
    { a: [0, 0, 0, 0] },
];

const rightSeats = [
    { g: [0, 0, 0, 0] },
    { f: [0, 0, 0, 0] },
    { e: [0, 0, 0, 0] },
    { d: [0, 0, 0, 0] },
    { c: [0, 0, 0, 0] },
    { b: [0, 0, 0, 0] },
    { a: [0, 0, 0, 0] },
];

const randomNumber = () => {
    const number = Math.random();
    return number < 0.75 ? 0 : 1;
}

const shuffle = (...args) => {
    args.forEach((arr) => {
        arr.map((row, rowIndex) => {
            const key = Object.keys(row)
            const values = Object.values(row)[0]
            arr[rowIndex][key].map((value, index) => {
                const pickNumber = randomNumber()
                arr[rowIndex][key][index] = pickNumber;
            })
        })
    })
}

shuffle(leftSeats, rightSeats);

let choosedSeats = [];

const leftSeatsDiv = document.querySelector('.left-seats');
const rightSeatsDiv = document.querySelector('.right-seats');
const seatsDiv = document.querySelector('.seats')
const divQty = document.querySelector('#qty');
const divAmount = document.querySelector('#amount');

const updateScreenValues = () => {
    const tickets = choosedSeats.length
    divQty.innerHTML = `${tickets}`
    divAmount.innerHTML = `$${tickets * 10}.00`
}

const handleValues = (id) => {
    if (choosedSeats.includes(id)) {
        choosedSeats = choosedSeats.filter((seat) => seat !== id);
    } else {
        choosedSeats.push(id);
    }
    updateScreenValues()
}

const handleClick = ({ target }) => {
    if (!target.id) {
        return
    }

    if (target.classList.contains('blocked')) {
        return
    }

    target.classList.toggle('selected')

    handleValues(target.id)

}

seatsDiv.addEventListener('click', (e) => handleClick(e))

leftSeats.map((row) => {
    const div = document.createElement('div')
    div.classList.add('seats-row')
    const key = Object.keys(row)
    Object.values(row)[0].map((seat, index) => {
        const seatDiv = document.createElement('div')
        seatDiv.classList.add('seat', `${seat === 1 && 'blocked'}`)
        seatDiv.setAttribute('id', `${key}${index + 1}`)
        div.appendChild(seatDiv)
    })
    leftSeatsDiv.appendChild(div)
})

rightSeats.map((row) => {
    const div = document.createElement('div')
    div.classList.add('seats-row')
    const key = Object.keys(row)
    Object.values(row)[0].map((seat, index) => {
        const seatDiv = document.createElement('div')
        seatDiv.classList.add('seat', `${seat === 1 && 'blocked'}`)
        seatDiv.setAttribute('id', `${key}${index + 5}`)
        div.appendChild(seatDiv)
    })
    rightSeatsDiv.appendChild(div)
})

