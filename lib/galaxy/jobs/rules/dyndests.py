from galaxy.jobs import JobDestination
import os
import multiprocessing

MINCPUS = 1
MAXCPUS = 4

def _adjustcpus(x):
    if x < MINCPUS:
        return MINCPUS
    elif x > MAXCPUS:
        return MAXCPUS
    else:
        return x


def mapping_dynamic_job_wrapper(job):
    #allocate extra cpus for large files.
    cpus_avail = multiprocessing.cpu_count()
    inp_data = dict([(da.name, da.dataset) for da in job.input_datasets])
    inp_data.update([(da.name, da.dataset) for da in job.input_library_datasets])
    query_file = inp_data["fastq_input1"].file_name
    query_size = os.path.getsize(query_file)
    if query_size > 100 * 1024 * 1024:
        cpunum = cpus_avail
    else:
        cpunum = cpus_avail/2
    cpunum = _adjustcpus(cpunum)
    cpu_str = "--ntasks=" + str(cpunum)
    return JobDestination(runner="slurm", params={"nativeSpecification": cpu_str})


def default_dynamic_job_wrapper(job):
    #Allocate the number of cpus based on the number available (by instance size)
    cpus_avail = multiprocessing.cpu_count()
    cpunum = cpus_avail/2
    cpunum = _adjustcpus(cpunum)
    cpu_str = "--ntasks=" + str(cpunum)
    return JobDestination(runner="slurm", params={"nativeSpecification": cpu_str})
