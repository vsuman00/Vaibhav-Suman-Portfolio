import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const interRegular = fetch(
  new URL(
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
  )
).then((res) => res.arrayBuffer());

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title =
      searchParams.get("title") || "John Doe - Full Stack Developer";
    const subtitle =
      searchParams.get("subtitle") || "Building exceptional web experiences";
    const type = searchParams.get("type") || "default"; // default, blog, project, about

    // Load font
    const fontData = await interRegular;

    // Define colors and styles based on type
    const getTheme = (type: string) => {
      switch (type) {
        case "blog":
          return {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            accent: "#4f46e5",
            icon: "📝",
          };
        case "project":
          return {
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            accent: "#ec4899",
            icon: "🚀",
          };
        case "about":
          return {
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            accent: "#0ea5e9",
            icon: "👨‍💻",
          };
        case "contact":
          return {
            background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            accent: "#10b981",
            icon: "📧",
          };
        case "experience":
          return {
            background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
            accent: "#f59e0b",
            icon: "💼",
          };
        case "publications":
          return {
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            accent: "#8b5cf6",
            icon: "📚",
          };
        default:
          return {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            accent: "#4f46e5",
            icon: "💻",
          };
      }
    };

    const theme = getTheme(type);

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: theme.background,
            fontFamily: "Inter",
            position: "relative",
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                          radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
            }}
          />

          {/* Content Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "80px",
              textAlign: "center",
              zIndex: 1,
            }}
          >
            {/* Icon */}
            <div
              style={{
                fontSize: "80px",
                marginBottom: "40px",
              }}
            >
              {theme.icon}
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: title.length > 50 ? "48px" : "64px",
                fontWeight: 700,
                color: "white",
                margin: "0 0 20px 0",
                lineHeight: 1.2,
                textShadow: "0 4px 8px rgba(0,0,0,0.3)",
                maxWidth: "900px",
              }}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              style={{
                fontSize: "28px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.9)",
                margin: "0 0 40px 0",
                lineHeight: 1.4,
                maxWidth: "700px",
              }}
            >
              {subtitle}
            </p>

            {/* Brand */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                padding: "16px 32px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "20px",
                }}
              >
                👨‍💻
              </div>
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "white",
                }}
              >
                vaibhavsuman.dev
              </span>
            </div>
          </div>

          {/* Decorative Elements */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              right: "40px",
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "2px solid rgba(255,255,255,0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              left: "40px",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              border: "2px solid rgba(255,255,255,0.2)",
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontData,
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

// Example usage:
// /api/og?title=My Blog Post&subtitle=Learn about web development&type=blog
// /api/og?title=My Project&subtitle=A cool web application&type=project
// /api/og?title=About Me&subtitle=Full Stack Developer&type=about
