use dep::std::hash::pedersen_hash;

fn main(answer: Field, answerHash : pub Field) {
    assert(pedersen_hash([answer]) == answerHash);
}

#[test]
fn test_main() {
    main(2015, 0x0697d06aa3f6751a16e67639cd9353aad84947004f01bc4a0e732af94bef3fdc)
}
