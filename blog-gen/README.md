# Blog Generator

This repository contains a Python-based blog generator that automates the creation of blog posts and manages associated data and images.

## Overview

The `blog-gen` tool is designed to streamline the process of generating blog content. It uses a collection of JSON files as input for blog ideas, generates blog posts, and organizes them along with their respective images in a structured output directory.

## Features

- **Automated Blog Generation**: Generates blog posts based on predefined ideas.
- **Image Management**: Downloads and replaces images within the generated blogs.
- **Content Extraction**: Extracts titles from blog content.
- **Structured Output**: Organizes generated blogs and images into dedicated directories.

## Project Structure

```
.
├── .gitignore
├── app.py
├── check_blog_images.py
├── data/
│   ├── blog_ideas_part1.json
│   ├── blog_ideas_part2.json
│   ├── ...
└── output/
    ├── blogs/
    │   ├── your-first-blog-post.json
    │   ├── another-great-read.json
    │   └── ...
    ├── images/
    │   ├── image1.jpg
    │   ├── image2.png
    │   └── ...
    ├── index.json
    ├── indexTime.txt
    ├── previewBlogs/
    └── topics.json
```

- `.gitignore`: Specifies intentionally untracked files to ignore.
- `app.py`: The main application script for generating blogs.
- `check_blog_images.py`: Script to verify blog images.
- `data/`: Contains JSON files with blog ideas.
- `download_and_replace_images.py`: Script to handle image downloading and replacement.
- `extract_titles.py`: Script to extract titles from generated content.
- `output/`: Directory where all generated content is stored.
    - `blogs/`: Stores the generated blog posts in JSON format.
    - `images/`: Contains images used in the blog posts.
    - `index.json`: An index file for all generated blogs.
    - `indexTime.txt`: Timestamp of the last index generation.
    - `previewBlogs/`: Contains preview versions of the blogs.
    - `topics.json`: A file listing blog topics.

## Installation

To set up the blog generator, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/PostAcle.git
   cd PostAcle/blog-gen
   ```

2. **Install dependencies**:

   It is recommended to use a virtual environment.

   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # On Windows
   # source venv/bin/activate  # On macOS/Linux
   pip install -r requirements.txt # Assuming a requirements.txt exists or you install dependencies manually
   ```
   *(Note: A `requirements.txt` file is not provided in the current context, so you might need to create one based on the Python scripts' imports.)*

## Usage

To generate blogs, run the `app.py` script:

```bash
python app.py
```

Ensure that your `data/` directory is populated with `blog_ideas_partX.json` files containing the ideas for your blog posts.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.