// server.ts
import app from './app'

const PORT = 3000

app.listen(PORT, () => {
    console.log(`✅ Server is running at http://localhost:${PORT}`)
})

function create_name(name: string) {
    const user = {
        name: 'khan ',
    }

    const fname = user.name

    console.log(fname)

    return name + fname
}

create_name('oop ')
