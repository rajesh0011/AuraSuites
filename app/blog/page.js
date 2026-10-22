import { fetchBlogList } from "../api/blogs";
import "../../app/styleblog.css";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

const dummyImage = "/blog-banner-main.jpg";

function stripHtml(html) {
  if (!html) return "";

  // Decode a limited set of common HTML entities
  const entityMap = {
    '&nbsp;': ' ',
    '&rsquo;': "'",
    '&lsquo;': "'",
    '&rdquo;': '"',
    '&ldquo;': '"',
    '&mdash;': '—',
    '&ndash;': '–',
    '&amp;': '&',
    '&quot;': '"',
    '&#39;': "'",
    '&lt;': '<',
    '&gt;': '>'
  };

  // Replace HTML entities with their character equivalents
  let decoded = html.replace(/&[a-zA-Z0-9#]+;/g, (match) => entityMap[match] || '');

  // Remove all HTML tags
  decoded = decoded.replace(/<[^>]+>/g, '');

  // Collapse multiple spaces, newlines, tabs, etc. into a single space
  return decoded.replace(/\s+/g, ' ').trim();
}

export async function generateMetadata() {

  return {
    title: "Blogs | Aura Suites",
    description: "Aura Suites",
    openGraph: {
      title: "Blogs | Aura Suites",
      description: "Read the latest articles from Aura Suites",
    },
    alternates: {
      canonical: "/blog",
    },
  };
}

export default async function BlogPage() {
  try {
    const blogs = await fetchBlogList();
    return (
      <>
       {/* <Header></Header> */}
        <section className="banner-section main-blog-page-banner">
        <img src="/images/banner.jpg" alt="banner image" className="banner-img mobile_img" />
          <img src="/images/banner.png" alt="banner image" className="banner-img desktop_img" />
        </section>

        <section className="blog-global-things">
          <div className="container">
            <div className="blog-list">
              <h1 className="m-3 inner-hd text-center">Aura Suites Blog</h1>
              <div className="row">
                <div className="col-lg-8">
                  <div className="row">
                    {blogs?.map((blog) => (
                      <div key={blog.id} className="col-md-6 mb-3">
                        <div className="blog-card-list no-image-bg">
                          <Image
                            src={blog.imageUrl || dummyImage}
                            height={350}
                            width={500}
                            alt={blog.title}
                            className="blog-list-image"
                          />
                          <div className="blog-list-content-box">
                            <Link
                              href={`/blog/${blog.urlSlug}`}
                              className="blog-list-title-link"
                            >
                              <h5 className="blog-list-title">{blog.title}</h5>
                            </Link>
                            {/* <p className="blog-category-and-date">
                              {blog?.postDate} -{" "}
                              <i>
                                <Link
                                  href={`/blog/${blog?.category_slug}`}
                                  className="blog-category-link"
                                >
                                  {blog?.category_name}
                                </Link>
                              </i>
                            </p> */}

                            <p className="blog-list-desc">
                              <span>{stripHtml(blog?.description)}</span>
                            </p>
                            <Link
                              href={`/blog/${blog?.urlSlug}`}
                              className="blog-list-link"
                            >
                              Read more
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                 <div className="col-lg-4">
                <div className="blog-list-sidebar-box-fixed">
                  <ContactForm />
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  } catch (error) {
    return <div>Error fetching blogs: {error.message}</div>;
  }
}