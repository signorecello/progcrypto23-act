use dep::std::hash::pedersen;
use dep::std::println;

fn main(input: [Field; 2]) -> pub Field {
    pedersen(input)[0]
}

#[test]
fn test_main() {
    let hash = main([1, 2]);
    println(hash);
}
