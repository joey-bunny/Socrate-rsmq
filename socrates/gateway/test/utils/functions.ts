export function generateName () {
  const first = ['smart', 'Harry', 'kane', 'esther', 'cole','favour']
  const last = ['peddler', 'Harry', 'heathen', 'esther', 'king','favour']


  const firstName = first[Math.floor(Math.random() * first.length)]
  const lastName = last[Math.floor(Math.random() * last.length)]

  const name = `${firstName} ${lastName}`
  const email = `${firstName}@${lastName}.com`
  const password = 'secret'
  const isLecturer = true

  const payload = {
    name,
    email,
    password,
    isLecturer
  }

  return payload
}

export function generateCourse () {
  const courseName = ['html', 'css', 'javascript', 'php', 'python', 'node', 'go', 'solidity', 'simplicity', 'react']
  const name = courseName[Math.floor(Math.random() * courseName.length)]
  const description = `Advanced ${name} course to get you ahead.` 

  const payload = {
    name,
    description
  }

  return payload
}