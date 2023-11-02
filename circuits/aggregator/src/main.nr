use dep::std;

fn main(
    // left main proof
    vk : [Field; 114], 
    vk_hash : Field, 

    left_proof : [Field; 94],
    left_public_inputs: [Field; 1],
    incoming_aggregation : [Field; 16],

    // right main proof
    right_proof : [Field; 94],
    right_public_inputs: [Field; 1],
) -> pub [Field; 16] {

    // now I can use them to verify their proof
    let intermediate_aggregation = std::verify_proof(
        vk.as_slice(), 
        left_proof.as_slice(), 
        left_public_inputs.as_slice(), 
        vk_hash, 
        incoming_aggregation
    );

    // now it's their turn, I hope they fail!
    // I wrapped my proof in another proof
    // so I'm essentially verifying my own proof here
    std::verify_proof(
        vk.as_slice(), 
        right_proof.as_slice(), 
        right_public_inputs.as_slice(), 
        vk_hash, 
        intermediate_aggregation
    )
}
