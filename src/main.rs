fn main() {
    println!("Hello, world!");
}

#[no_mangle]
pub fn add(x: i32, y: i32) -> i32 {
    return x + y;
}
