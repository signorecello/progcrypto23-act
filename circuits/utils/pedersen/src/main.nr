use dep::std::hash::pedersen;
use dep::std::println;

fn main(input: Field) -> pub Field {
    pedersen([input])[0]
}

#[test]
fn test_main() {
    let hash = main(1);
    println(hash);
}
