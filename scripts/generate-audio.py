#!/usr/bin/env python3
"""
Generate phonics audio files using edge-tts (Microsoft Neural TTS)
Voice: en-US-JennyNeural

Usage:
  python3 scripts/generate-audio.py
"""

import asyncio
import re
from pathlib import Path

import edge_tts

VOICE = "en-US-JennyNeural"
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "audio"


def sanitize(text: str) -> str:
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')


async def generate(text: str, filepath: Path, rate: str = "-20%", pitch: str = "+5Hz"):
    if filepath.exists():
        print(f"  skip: {filepath.name}")
        return
    try:
        communicate = edge_tts.Communicate(text, VOICE, rate=rate, pitch=pitch)
        await communicate.save(str(filepath))
        print(f"  ok:   {filepath.name}  ({text!r})")
    except Exception as e:
        print(f"  ERR:  {filepath.name}  ({e})")


# phonicsEn (表示用) → TTS に渡すテキスト
PHONICS_TTS = {
    "ah":   "aah",
    "buh":  "buh",
    "kuh":  "kuh",
    "duh":  "duh",
    "eh":   "eh",
    "fuh":  "fuh",
    "guh":  "guh",
    "huh":  "huh",
    "ih":   "ih",
    "juh":  "juh",
    "kwuh": "kw",
    "luh":  "luh",
    "muh":  "muh",
    "nuh":  "nuh",
    "puh":  "puh",
    "ruh":  "ruh",
    "suh":  "suh",
    "tuh":  "tuh",
    "uh":   "uh",
    "vuh":  "vuh",
    "wuh":  "wuh",
    "ks":   "x",
    "yuh":  "yuh",
    "zuh":  "zuh",
}

WORD_POOL = {
    "A": [("Apple","ah"),("Ant","ah"),("Alligator","ah"),("Arrow","ah"),("Astronaut","ah")],
    "B": [("Bear","buh"),("Ball","buh"),("Banana","buh"),("Bird","buh"),("Bus","buh"),("Book","buh"),("Butterfly","buh")],
    "C": [("Cat","kuh"),("Car","kuh"),("Cake","kuh"),("Cow","kuh"),("Cup","kuh"),("Cookie","kuh")],
    "D": [("Dog","duh"),("Duck","duh"),("Door","duh"),("Drum","duh"),("Diamond","duh"),("Dolphin","duh")],
    "E": [("Egg","eh"),("Elephant","eh"),("Eagle","eh"),("Ear","eh"),("Earth","eh")],
    "F": [("Fish","fuh"),("Frog","fuh"),("Flower","fuh"),("Fire","fuh"),("Fox","fuh"),("Football","fuh")],
    "G": [("Gorilla","guh"),("Grapes","guh"),("Guitar","guh"),("Gift","guh"),("Goat","guh")],
    "H": [("Hat","huh"),("Horse","huh"),("House","huh"),("Heart","huh"),("Honey","huh"),("Hammer","huh")],
    "I": [("Igloo","ih"),("Ice cream","ih"),("Insect","ih"),("Island","ih"),("Ink","ih")],
    "J": [("Juice","juh"),("Jellyfish","juh"),("Jam","juh"),("Jet","juh"),("Jungle","juh")],
    "K": [("King","kuh"),("Kangaroo","kuh"),("Key","kuh"),("Kite","kuh"),("Koala","kuh")],
    "L": [("Lion","luh"),("Lemon","luh"),("Leaf","luh"),("Ladybug","luh"),("Lamp","luh"),("Lock","luh")],
    "M": [("Moon","muh"),("Monkey","muh"),("Mouse","muh"),("Milk","muh"),("Mountain","muh"),("Mushroom","muh")],
    "N": [("Nose","nuh"),("Nest","nuh"),("Nut","nuh"),("Noodle","nuh"),("Night","nuh")],
    "O": [("Octopus","ah"),("Orange","ah"),("Owl","ah"),("Otter","ah"),("Onion","ah")],
    "P": [("Pig","puh"),("Penguin","puh"),("Pizza","puh"),("Panda","puh"),("Pencil","puh"),("Pumpkin","puh"),("Popcorn","puh")],
    "Q": [("Queen","kwuh"),("Quail","kwuh"),("Question","kwuh"),("Quilt","kwuh")],
    "R": [("Rabbit","ruh"),("Rainbow","ruh"),("Robot","ruh"),("Rocket","ruh"),("Ring","ruh"),("Rose","ruh")],
    "S": [("Sun","suh"),("Star","suh"),("Snake","suh"),("Strawberry","suh"),("Shark","suh"),("Snowman","suh")],
    "T": [("Tiger","tuh"),("Tree","tuh"),("Train","tuh"),("Turtle","tuh"),("Tomato","tuh"),("Trumpet","tuh")],
    "U": [("Umbrella","uh"),("Unicorn","uh"),("Uniform","uh"),("UFO","uh"),("Urchin","uh")],
    "V": [("Violin","vuh"),("Volcano","vuh"),("Van","vuh"),("Vase","vuh"),("Vest","vuh")],
    "W": [("Whale","wuh"),("Watermelon","wuh"),("Wolf","wuh"),("Watch","wuh"),("Worm","wuh"),("Window","wuh")],
    "X": [("Fox","ks"),("Box","ks"),("Xylophone","ks"),("Rex","ks"),("Six","ks")],
    "Y": [("Yacht","yuh"),("Yogurt","yuh"),("Yarn","yuh"),("Yak","yuh"),("Yellow","yuh")],
    "Z": [("Zebra","zuh"),("Zoo","zuh"),("Zipper","zuh"),("Zombie","zuh"),("Zigzag","zuh")],
}


async def main():
    letters_dir = OUTPUT_DIR / "letters"
    phonics_dir = OUTPUT_DIR / "phonics"
    words_dir   = OUTPUT_DIR / "words"
    for d in [letters_dir, phonics_dir, words_dir]:
        d.mkdir(parents=True, exist_ok=True)

    print("=== Letter names (A-Z) ===")
    for letter in "ABCDEFGHIJKLMNOPQRSTUVWXYZ":
        await generate(letter.lower(), letters_dir / f"{letter.lower()}.mp3",
                       rate="-25%", pitch="+5Hz")

    print("\n=== Phonics sounds ===")
    seen = set()
    for words in WORD_POOL.values():
        for (_, phonics_en) in words:
            if phonics_en in seen:
                continue
            seen.add(phonics_en)
            tts_text = PHONICS_TTS.get(phonics_en, phonics_en)
            await generate(tts_text, phonics_dir / f"{sanitize(phonics_en)}.mp3",
                           rate="-30%", pitch="+5Hz")

    print("\n=== Words ===")
    seen = set()
    for words in WORD_POOL.values():
        for (word, _) in words:
            key = sanitize(word)
            if key in seen:
                continue
            seen.add(key)
            await generate(word, words_dir / f"{key}.mp3",
                           rate="-20%", pitch="+5Hz")

    total = sum(1 for _ in OUTPUT_DIR.rglob("*.mp3"))
    print(f"\nDone! {total} files in {OUTPUT_DIR}")


if __name__ == "__main__":
    asyncio.run(main())
