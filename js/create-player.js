function createPlayer(name, marker) {
    let score = 0;
    const getScore = () => score;
    const addScore = () => score++;
    return { name, marker, getScore, addScore, resetScore };
}

export { createPlayer };