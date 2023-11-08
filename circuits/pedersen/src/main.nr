use dep::std::hash::pedersen_hash;
use dep::std::println;

fn main(input: Field) -> pub Field {
    pedersen_hash([input])
}

#[test]
fn test_main() {
    let hash = main(2015);
    println(hash);
}
