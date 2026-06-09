export async function DELETE(req) {
    try {
        await verifyAdmin(req);

        const { id } = await req.json();

        await User.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 403 }
        );
    }
}