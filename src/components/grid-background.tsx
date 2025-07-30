export default function GridBackground() {
  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 60px 60px, rgba(0, 110, 255, 0.2) 2.5px, transparent 1px),
            radial-gradient(circle at 0px 60px, rgba(0, 110, 255, 0.2) 2.5px, transparent 1px),
            radial-gradient(circle at 60px 0px, rgba(0, 110, 255, 0.2) 2.5px, transparent 1px),
            radial-gradient(circle at 0px 0px, rgba(0, 110, 255, 0.2) 2.5px, transparent 1px),
            linear-gradient(rgba(128, 128, 128, ${0.1}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(128, 128, 128, ${0.1}) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px, 60px 60px, 60px 60px",
          filter: "drop-shadow(0 0 2px rgba(0, 255, 255, 0.3))",
        }}
      />

      <div className="pointer-events-none fixed inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)] dark:bg-black"></div>
    </>
  );
}
