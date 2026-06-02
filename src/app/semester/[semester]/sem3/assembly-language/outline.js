export const ComputerSystemsArchitectureCourse = {
    outline: `Introduction to computer systems: information is bits + context, programs are translated by other programs into different forms, it pays to understand how compilation systems work, processors read and interpret instructions stored in memory, caches matter, storage devices form a hierarchy, the operating system manages the hardware, systems communicate with other systems using networks. Representing and manipulating information: information storage, integer representations, integer arithmetic, floating point. Machine-level representation of programs: a historical perspective, program encodings, data formats, accessing information, arithmetic and logical operations, control, procedures, array allocation and access, heterogeneous data structures, pointers, debugging with gdb, out-of-bounds memory references and buffer overflow, x86-64 architecture, machine-level representation of floating-point programs. Processor architecture: the Y86 instruction set architecture, logic design and hardware control language (HCL), sequential Y86 implementations, principles of pipelining, pipelined Y86 implementations.`,

    textBooks: [
        {
            title: "Computer Systems: A Programmer’s Perspective (CS:APP3e)",
            authors: [
                "Randal E. Bryant",
                "David R. O'Hallaron"
            ],
            publisher: "Carnegie Mellon University Press"
        }
    ],

    referenceMaterials: [
        {
            title: "MIPS Assembly Language Programming",
            authors: [
                "Robert Britton"
            ]
        },
        {
            title: "Computer System Architecture",
            authors: [
                "M. Morris Mano"
            ]
        },
        {
            title: "Assembly Language Programming for Intel Computers"
        }
    ]
};