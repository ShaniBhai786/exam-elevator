export const LinuxOperatingSystemCourse = {
    outline: `Interacting with Linux operating system: virtualization and hypervisors, Linux distributions, installing Linux on VirtualBox, Linux file hierarchy standard. File system architecture: schematic view of a standard UNIX file system, contents of boot block, superblock, inode block, and data blocks. File system mounting: concept of mounting, Linux configuration files related to mounting, commands like mount, umount, lsblk, blkid, fsck, e2fsck, FAT and NFS file system checks. File permissions: standard permissions, chmod, chown, umask. Special permissions: SUID, SGID, sticky bit. Device files: file types in Linux, /dev directory, terminal vs disk files. Terminal attributes: terminal devices, stty command usage. Hard and soft links: differences and creation using ln. Systemd services: system daemons, unit files, targets, service management using systemctl, creating basic services. Linux boot process: BIOS/UEFI, MBR, boot loader, kernel initialization, init/systemd. Linux system programming: system call interface, gcc usage, object inspection using objdump and readelf. Process management: getpid, getppid, fork, exit, wait, exec. File management and redirection (PPFDT concept). Inter-process communication: pipes, FIFOs, sockets. Signals: synchronous and asynchronous signals, signal handlers, kill command, common signals (SIGHUP, SIGINT, SIGKILL, SIGTERM, SIGSEGV, etc.). Threads and scheduling: POSIX pthread programming (pthread_create, pthread_join, pthread_exit), scheduling tools (schedtool), CPU affinity, priority control. Thread synchronization using mutexes. File system creation tools (mkfs, mke2fs, mkntfs, mkfs.fat, mkfs.minix).`,

    textBooks: [
        {
            title: "Unix: The Text Book",
            authors: [
                "Sarwar",
                "Koretsky"
            ],
            edition: "3rd",
            isbn: "978-1-4822-3358-2"
        }
    ],

    referenceMaterials: []
};