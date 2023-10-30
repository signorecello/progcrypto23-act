use dep::std::hash::pedersen;

fn main(
    my_number : Field,
    random_number : pub Field,
    their_guess_pub : pub Field,
    my_hashed_number : pub Field,
    ) {
    assert(their_guess_pub != my_number);
    assert(pedersen([my_number, random_number])[0] == my_hashed_number);
}

// You may think I could just change their_guess_pub, but I'd be caught anyway
// since my opponent will verify my proof with that as a public input

#[test]
fn i_win() {
    // I'm thinking 2
    // other user doesn't guess my number, I win
    main(1, 2, 3, 0x2edc3d8071220dd3580d776d40412ffcf8201fb1b3eef8543bf0991aff878ea9);
}

#[test(should_fail)]
fn i_lose() {
    // I'm thinking 1
    // other user guesses my number, I lose :(
    main(1, 2, 1, 0x2edc3d8071220dd3580d776d40412ffcf8201fb1b3eef8543bf0991aff878ea9);
}

#[test(should_fail)]
fn i_try_to_cheat_1() {
    // I'm thinking 1
    // other user guesses my number, but I'm a fucking shameless cheater
    // so I try to change my number
    main(2, 2, 1, 0x2edc3d8071220dd3580d776d40412ffcf8201fb1b3eef8543bf0991aff878ea9);
}

#[test(should_fail)]
fn i_try_to_cheat_2() {
    // I'm thinking 1
    // and I already got caught cheating once
    // but besides being a cheater, I'm also dumb as fuck
    // so I use another pedersen hash and see if that works
    main(1, 2, 1, 0x162a5a9c7dc5beff11846c5bfb981dd050df667f30beaab747a7cea89023a54f);
}
