use dep::std::hash::pedersen;

fn main(answer: Field, answerHash : pub Field) {
    assert(pedersen([answer])[0] == answerHash);
}
